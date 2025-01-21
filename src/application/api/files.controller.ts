import { Controller, Get, Logger } from '@nestjs/common';
import { DependencyInjectionService } from '../dependcyInjection.service';
import { File } from 'src/domain/entities/file';

@Controller("/files")
export class FilesController {
  private readonly logger = new Logger("FilesController");
  constructor(private readonly appService: DependencyInjectionService) {}

  @Get()
  getFiles(): File[] {
    this.appService.updateRepositoryUseCaseWithLog(this.logger);
    const projectConfig = this.appService.getProjectConfigUseCase();
    return this.appService.getFilesUseCase(projectConfig);
  }
}
