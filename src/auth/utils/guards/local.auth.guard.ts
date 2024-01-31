import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    try{
      const activate = (await super.canActivate(context)) as boolean; // 로그인 성공시 true, 실패시 false
      const request = context.switchToHttp().getRequest();
      await super.logIn(request); // 세션에 사용자 정보를 저장
      return activate;
    }catch(err){
      throw err;
    }
  }
}