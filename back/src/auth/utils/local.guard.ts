import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    console.log('login 메서드 호출 직전', request.user);
    await super.logIn(request);
    return activate;
  }
}