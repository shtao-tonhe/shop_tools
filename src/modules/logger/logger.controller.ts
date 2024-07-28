
import { Controller, Get, Inject } from '@nestjs/common';
import { LoggerService } from './logger.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller('logger')
export class LoggerController {
  constructor(
    private readonly loggerService: LoggerService
  ) { }

  @Get('list')
  async findAll() {
    const data = await this.loggerService.findAll()
    return {
      code: 200,
      data: data
    }
  }

  @Get('allLog')
  async getALlLog() {
    const data = await this.loggerService.readRequestAllLog()
    return {
      code: 200,
      data: data
    }
  }

  @Get('latestLog')
  async getLatestLog() {
    try {
      const logFileContent = await this.readLatestLog(); // 读取日志文件的最新部分
      return logFileContent;
    } catch (error) {
      return { error: 'Error reading log file.' };
    }
  }

  private readLatestLog(): Promise<string> {
    // const logFilePath = path.resolve(__dirname, '../../logs/app.log');
    const logFilePath = 'E:\/codeing\/test\/004_nestjs_demo\/demo2\/logs\/app.log';
    const bufferSize = 1024; // 设置缓冲区大小，根据需要调整

    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(logFilePath, {
        start: fs.statSync(logFilePath).size - bufferSize, // 从文件末尾向前读取
        end: fs.statSync(logFilePath).size,
        encoding: 'utf8',
      });

      let logData = '';

      fileStream.on('data', (chunk) => {
        logData += chunk;
      });

      fileStream.on('end', () => {
        resolve(logData);
      });

      fileStream.on('error', (error) => {
        reject(error);
      });
    });
  }
}
