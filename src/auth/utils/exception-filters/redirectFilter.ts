import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class RedirectFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(401).send('로그인이 필요합니다.');
  }
}


@Catch(HttpException)
export class ErrorToObjectFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log(exception.getResponse());
    response.json({
      ...Object(exception.getResponse()),
    });
  }
}