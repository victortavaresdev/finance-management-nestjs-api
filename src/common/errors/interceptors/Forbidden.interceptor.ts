import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { ForbiddenError } from '../types/ForbiddenError';

@Injectable()
export class ForbiddenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof ForbiddenError)
          throw new ForbiddenException({
            code: 'FORBIDDEN',
            message: error.message,
            status: HttpStatus.FORBIDDEN,
          });
        else throw error;
      }),
    );
  }
}
