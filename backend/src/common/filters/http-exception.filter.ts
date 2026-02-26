import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../interfaces/api-response.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let data = null;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse() as any;
            message = exceptionResponse?.message || exception.message;
            if (Array.isArray(message)) {
                message = message[0]; // Take first validation error if it's an array
            }
            data = exceptionResponse?.error || null;
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        const payload: ApiResponse<any> = {
            success: false,
            message: typeof message === 'string' ? message : JSON.stringify(message),
            data: data,
        };

        response.status(status).json(payload);
    }
}
