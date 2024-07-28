

import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';

import { Logger } from "./entities/logger.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Logger])],
  providers: [LoggerService],
  controllers: [LoggerController],
})
export class LoggerModule { }
