import { AuthService } from '../auth.service';
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../entites/user.entity'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: User, done: Function) {
    console.log('SerializeUser');
    console.log(user);
    done(null, user.id);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(payload: any, done: Function) {
    console.log('DeserializeUser');
    console.log('패스포트에서 받은 세션 아이디', payload);
    const user = await this.authService.findOneBy(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}