
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { Search } from './entities/search.entity';
// import { Loggers } from '../logger/entities/logger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Search])],
  controllers: [SearchController],
  providers: [SearchService]
})


// 每个生命周期钩子都由一个接口表示。 接口在技术上是可选的，因为它们在 TypeScript 编译后不存在。
export class SearchModule implements OnModuleInit {
  // export class SearchModule {
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
}
