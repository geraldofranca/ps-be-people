import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';
import { DomainException } from '../../core/exceptions/domain.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (exception instanceof DomainException) {
      return res
        .status(exception.statusCode)
        .json({ message: exception.message });
    }

    if (exception instanceof ZodError) {
      const errors = exception.errors.map(
        (e) => `${e.path.join('.')}: ${e.message}`,
      );
      return res
        .status(400)
        .json({ message: 'Validation failed', details: errors });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const { message } = exception.getResponse() as any;
      return res.status(status).json({ message });
    }

    console.error('Unhandled exception', exception);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
