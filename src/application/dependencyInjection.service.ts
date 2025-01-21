import { Injectable, Logger } from "@nestjs/common";
import constants from "src/application/configs/constants";
import { File } from "src/domain/entities/file";
import { Project } from "src/domain/entities/project";
import { FileParser } from "src/domain/ports/fileParser";
import { NoteRepository } from "src/domain/ports/noteRepository";
import { ProjectParser } from "src/domain/ports/projectParser";
import getFiles from "src/domain/usecases/getFiles.usecase";
import getProjectConfig from "src/domain/usecases/getProjectConfig.usecase";
import initNoteRepository from "src/domain/usecases/initNoteRepository.usecase";
import updateNoteRepository from "src/domain/usecases/updateNoteRepository.usecase";
import { FileParserObsidianMarkdown } from "./adapters/fileParser";
import { HashStorage, HashStorageFile, NoteRepositoryGitObsidianVault } from "./adapters/noteRepositoryGitObsidianVault";
import { ProjectParserYaml } from "./adapters/projectParser";

@Injectable()
export class DependencyInjectionService {

  private projectParser: ProjectParser;
  private fileParser: FileParser;
  private noteRepository: NoteRepository;
  private hashStorage: HashStorage;

  private readonly logger = new Logger("DependencyInjectionService");

  constructor() {
    this.projectParser = new ProjectParserYaml();
    this.fileParser = new FileParserObsidianMarkdown();
    this.hashStorage = new HashStorageFile(constants.hashFilePath);
    this.noteRepository = new NoteRepositoryGitObsidianVault(this.hashStorage, constants.obsidian_path);
  }

  updateRepositoryUseCase(): boolean {
    return updateNoteRepository(this.noteRepository);
  }

  updateRepositoryUseCaseWithLog(logger: Logger): boolean {
    const updateRepositoryResult = this.updateRepositoryUseCase()
    if (updateRepositoryResult) {
      logger.log("Il a été nécessaire de mettre à jour le repository")
    }
    else {
      logger.log("Le repository est déjà à jour")
    }

    return updateRepositoryResult;
  }

  initNoteRepositoryUseCase(): boolean {
    return initNoteRepository(this.noteRepository);
  }

  initNoteRepositoryUseCaseWithLog(logger: Logger): void {
    if (this.initNoteRepositoryUseCase()) {
      logger.log("Le repository à été clone")
    }
    else {
      logger.log("Le repository exite déjà")
    }
  }

  getProjectConfigUseCase(): Project {
    return getProjectConfig(this.projectParser, constants.obsidian_project_config_path);
  }

  getFilesUseCase(projectConfig: Project): File[] {
    return getFiles(this.fileParser, this.getAtomicFullPath(projectConfig));
  }

  private getAtomicFullPath(projectConfig: Project): string {
    return constants.obsidian_path + "/" + projectConfig.folderPath.atomic;
  }
}