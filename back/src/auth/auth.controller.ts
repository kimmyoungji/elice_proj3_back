import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/google.guard';
import { AuthService } from './auth.service';
import { LocalSignupDto } from './dto/localSignupDto';
import { InsertResult } from 'typeorm';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './utils/local.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}



    /* 구글 로그인 및 사용자등록 */
    @ApiOperation({ summary: '구글 로그인 요청 API' })
    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleGoogleLogin() {}

    @ApiOperation({ summary: '구글서버에서 사용자인증 후 accessToken을 보내는 주소'})
    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard) // 여기서 req.user에 user 정보가 담김
    handleGoogleRedirect(@Req() request:any ,@Res() response:any): void {
        // console.log(request.sessionStore); 
        response.json(request.user)
    }



    /* 로컬 로그인 및 사용자등록 */
    @ApiOperation({ summary: '로컬 회원가입 요청 API' })
    @Post('local/signup')
    async handleLocalSignup(@Body() localSignupDto: LocalSignupDto): Promise<InsertResult>{
       return await this.authService.localSignup(localSignupDto);
    }

    @ApiOperation({ summary: '로컬 로그인 요청 API' })
    @Post('local/login')
    @UseGuards(LocalAuthGuard)
    async handleLocalLogin(
        @Req() request: any, @Res() response: any){
        response.json(request.user);
    }
   


    /* 구글 로그아웃, 로컬 로그아웃 공용 API */
    @ApiOperation({ summary: '로그아웃 uri' })
    @Get('logout')
    async handleGoogleLogout(@Req() request: any, @Res() response: any): Promise<void> {

        const sessionId = request.signedCookies[process.env.SESSION_COOKIE_NAME];
        // console.log('로그아웃 후의 세션저장소 :', request.sessionStore,'\n로그아웃 힐 세션아이디: ', sessionId );
        
        try{    
            await request.sessionStore.destroy(sessionId, (err)=>err && {msg: 'logout fail', err: err});
            request.user = null;
            await response.clearCookie(process.env.SESSION_COOKIE_NAME, {signed: true});
            await response.send({msg: 'logout success'});

        }catch(err){ throw err; }
        // finally{ console.log('로그아웃 후의 세션저장소: ', request.sessionStore); }
    }
}
