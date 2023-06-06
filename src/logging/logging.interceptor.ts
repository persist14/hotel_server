import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { url, method } = context.switchToHttp().getRequest()
    const now = Date.now();
    console.log(`请求路径为： ${url}`)
    console.log(`请求路方法： ${method}`)
    return next
        .handle()
        .pipe(
            tap(() => console.log(`接口响应时间： ${Date.now() - now}ms`)),
        );
  }
}
