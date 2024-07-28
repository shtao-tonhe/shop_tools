import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

import * as cors from 'cors';

// import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
// import { UseroptlogInterceptor } from "./common/interceptors/Useroptlog.interceptor";
// import { AuthGuard } from "./common/guards/auth.guard";

// import { logger } from './common/middleware/logger.middleware'

// 官方教学视频整理的学习目录
// https://blog.csdn.net/KaiSarH/article/details/124972982

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });

  app.use(cors()); //设置允许跨域
  // app.use(logger) //全局使用过滤器
  // app.setGlobalPrefix('v1');//设置全局路由前缀
  // app.useGlobalInterceptors(new UseroptlogInterceptor());//全局拦截器
  // app.useGlobalGuards(new AuthGuard());//全局守卫
  app.use(
    session({
      secret: 'systemTag',
      name: 'system.tag',
      cookie: {
        maxAge: 99999999,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
