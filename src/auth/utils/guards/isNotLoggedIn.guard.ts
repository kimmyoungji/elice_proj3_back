import { LocalLoginDto } from './../../dto/localLoginDto';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpStatus, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class isNotLoggedInGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    if (request.user) {
      throw new UnauthorizedException("이미 로그인이 되어 있습니다.");
    }
    const localLoginDto: LocalLoginDto = request.body;
    if(!localLoginDto.email || !localLoginDto.password){
      throw new HttpException("등록되지 않은 이메일 이거나, 유효하지 않은 비밀번호입니다.", HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}