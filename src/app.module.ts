import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseConfig from './config/databaseConfig';
import authConfig from './config/authConfig';

import UserMiddleware from './common/middleware/user.middleware';
// import { LoggerMiddleware } from './common/middleware/logger.middleware'

import { ConfigModule as SystemConfig } from './config/app.modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './modules/user/user.module';
import { SearchModule } from './modules/search/search.module';
import { SystemModule } from './modules/system/system.module';
import { LoggerModule } from './modules/logger/logger.module';
import { RobotModule } from './modules/robot/robot.module';

// import { UserController } from './modules/user/user.controller';
// import { SearchController } from './modules/search/search.controller';
// import { AuthGuard } from "./common/guards/auth.guard";

// import { Search } from "./modules/search/entities/search.entity";
// import { User } from "./modules/user/entities/user.entity";
// import { Logger } from "./modules/logger/entities/logger.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'th_sass_sales_tool',
      timezone: '+0:00', // 设置时区
      // entities: [__dirname + `/**/*.entity{.ts,.js}`],
      autoLoadEntities: true, //自动将实体加入entities
      // synchronize: true,
      // entities: [Logger, Search, User],
    }),
    // ConfigModule.forRoot({
    //   // load: [databaseConfig, authConfig],
    //   isGlobal: true,//全局使用模块
    //   // ignoreEnvFile: true, //禁用环境变量加载
    //   envFilePath: '.development.env',
    //   // envFilePath: ['.env.development.local', '.env.development'],// 多个路径
    // }),
    SystemConfig, //应用整体配置
    SystemModule,
    LoggerModule,
    UserModule,
    SearchModule,
    RobotModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // { //全局守卫
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // // consumer.apply(UserMiddleware)
    // consumer
    //   .apply(LoggerMiddleware, UserMiddleware)
    //   .exclude( //指定路由排除中间件
    //     { path: 'user/(.*)', method: RequestMethod.GET },
    //     // { path: 'user', method: RequestMethod.POST },
    //     // 'user/(.*)',
    //   )
    //   .forRoutes('search', 'user');
    // // .forRoutes(SearchController, UserController);
  }
}
