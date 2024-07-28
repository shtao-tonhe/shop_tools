import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as Moment from 'moment'; // 处理时间的

@Injectable()
export class UseroptlogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('@拦截器 Before......@', context)
    const request = context.switchToHttp().getRequest();
    // 获取请求的URL
    const requestUrl = request.url;
    // 获取来源IP地址
    // const clientIp = request.ip;
    // 获取真实的源IP地址
    const clientIp = request.realIp || request.ip;
    console.log(`请求的url${requestUrl}, 来源ip${clientIp}`)
    const now = Moment().valueOf();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Moment().valueOf() - now}ms`)),
      );
  }
}


