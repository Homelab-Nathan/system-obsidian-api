import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DependencyInjectionService } from './dependencyInjection.service';

@Injectable()
export class StartUpService implements OnModuleInit {
  private readonly logger = new Logger(StartUpService.name);

  constructor(private readonly dependencyInjectionService: DependencyInjectionService) {}

  onModuleInit() {
    this.logger.debug("")
    this.logger.debug("##### Initialisation #####")

    this.dependencyInjectionService.initNoteRepositoryUseCaseWithLog(this.logger);
    this.dependencyInjectionService.updateRepositoryUseCaseWithLog(this.logger);
    
    this.logger.debug("##### -------------- #####")
    this.logger.debug("")
  }
}