import { AuthService } from '../auth.service';
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: User, done: Function) {
    console.log('SerializeUser');
    console.log(user);
    done(null, user.userId);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(payload: any, done: Function) {
    console.log('DeserializeUser');
    console.log('패스포트에서 받은 사용자', payload);
    // 여기서 payload.id는 serializeUser에서 done(null, user)로 넘겨준 값
    const user = await this.authService.findOneByUserId(payload);
    console.log("디시리얼라이즈를 통해 찾아낸 사용자",user);
    return user ? done(null, user) : done(null, null);
  }
}