import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { FileParser } from "src/domain/ports/fileParser";
import { ProjectParser } from "src/domain/ports/projectParser";
import { ProjectParserYaml } from "./adapters/projectParser";
import { FileParserObsidianMarkdown } from "./adapters/fileParser";
import { Project } from "src/domain/entities/project";
import getProjectConfig from "src/domain/usecases/getProjectConfig";
import constants from "src/application/configs/constants";
import { File } from "src/domain/entities/file";
import getFiles from "src/domain/usecases/getFiles";
import { NoteRepository } from "src/domain/ports/noteRepository";
import { HashStorage, HashStorageFile, NoteRepositoryGitObsidianVault } from "./adapters/noteRepositoryGitObsidianVault";
import updateRepository from "src/domain/usecases/updateNoteRepository";
import updateNoteRepository from "src/domain/usecases/updateNoteRepository";
import initNoteRepository from "src/domain/usecases/initNoteRepository";

@Injectable()
export class DependencyInjectionService implements OnModuleInit{

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

  onModuleInit() {
    this.logger.debug("")
    this.logger.debug("##### Initialisation #####")

    this.initNoteRepositoryUseCaseWithLog(this.logger);
    this.updateRepositoryUseCaseWithLog(this.logger);
    
    this.logger.debug("##### -------------- #####")
    this.logger.debug("")
  }

  updateRepositoryUseCase(): boolean {
    return updateNoteRepository(this.noteRepository);
  }

  updateRepositoryUseCaseWithLog(logger: Logger): boolean {
    const updateRepositoryResult = this.updateRepositoryUseCase()
    if(updateRepositoryResult) {
      logger.log("Il est nécessaire de mettre à jour le repository")
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
    if(this.initNoteRepositoryUseCase()) {
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