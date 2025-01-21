import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DependencyInjectionService } from './dependencyInjection.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly dependencyInjectionService: DependencyInjectionService) {}

  @Cron(CronExpression.EVERY_HOUR)
  syncRepository() {
    this.dependencyInjectionService.updateRepositoryUseCaseWithLog(this.logger);
  }
}