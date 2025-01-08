import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class MyInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('MY_INTERCEPTOR BEFORE');
    return next.handle().pipe(tap(() => console.log('MY_INTERCEPTOR AFTER')));
  }
}
