import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, timeout } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    console.log('转换响应体', context)
    return next
      .handle()
      // .pipe(map(value => value === null ? '' : value)); //将响应中的null换为‘’
      .pipe(
        //设置一个3s的响应市场如果说超时就会自动取消，返回rxjs错误，释放资源
        timeout(3000),
        catchError(err => {
          if (err instanceof TimeoutError) {
            console.log('rxjs超时错误，释放资源')
            return throwError(() => new RequestTimeoutException());
          }
          return throwError(() => err);
        }),
      )
  }
}