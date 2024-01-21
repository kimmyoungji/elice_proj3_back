import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' }); 
  }

  async validate(email: string, password: string, done: Function): Promise<any> {
      const user = await this.authService.validateLocalUser(email, password);
      if (!user) {
        throw new HttpException("회원가입이 되어있지 않습니다.", HttpStatus.UNAUTHORIZED);
      }
      return user;
  }
}




