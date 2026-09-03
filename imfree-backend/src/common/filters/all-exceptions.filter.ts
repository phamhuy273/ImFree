import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const resBody =
      exception instanceof HttpException ? exception.getResponse() : null;
    const message =
      typeof resBody === 'object' && resBody !== null && 'message' in resBody
        ? (resBody as any).message
        : (exception as any)?.message || 'Lỗi máy chủ nội bộ';

    response.status(status).json({
      success: false,
      statusCode: status,
      message: Array.isArray(message) ? message[0] : message,
      error:
        typeof resBody === 'string' ? resBody : (resBody as any)?.error || null,
      timestamp: new Date().toISOString(),
    });
  }
}
