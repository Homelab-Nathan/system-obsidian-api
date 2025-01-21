import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { FilesController } from './api/files.controller';
import { DependencyInjectionService } from './dependencyInjection.service';
import { StartUpService } from './startup.service';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env',}),
    ScheduleModule.forRoot()
  ],
  controllers: [FilesController],
  providers: [DependencyInjectionService, CronService, StartUpService],
})
export class GlobalModule {}
