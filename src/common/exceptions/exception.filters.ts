import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const name = exception.message;

    const message = exception.getResponse() as {
      statusCode: number;

      message: string[] | string;
      response: string[] | string;
    };
    const messageEval = Array.isArray(message.message)
      ? `${message.message.join('\n\n')}`
      : message.message ?? message.response;
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      //  path: request.url,
      message: messageEval,
    });
  }
}
