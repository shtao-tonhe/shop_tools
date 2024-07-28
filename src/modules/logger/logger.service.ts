
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from './entities/logger.entity'

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(Logger)
    private userRepository: Repository<Logger>,
  ) { }

  async findAll() {
    return await this.userRepository.find();
  }

  async readRequestAllLog() {
    return await this.userRepository.find();
  }

  async findSystemRequestLogs() {
    return await this.userRepository.find();
  }
}
