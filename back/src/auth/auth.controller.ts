import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/google.guard';
import { AuthService } from './auth.service';
import { LocalSignupDto } from './dto/localSignupDto';
import { DataSource, InsertResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalLoginDto } from './dto/localLoginDto';
import { LocalAuthGuard } from './utils/local.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    // 구글 로그인
    @ApiOperation({ summary: '구글 로그인 요청 API' })
    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleGoogleLogin() {}

    @ApiOperation({ summary: '구글서버에서 인증 후, accessToken을 보내는 주소 (리다이렉팅하는 주소)' })
    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard) // 여기서 req.user에 user 정보가 담김
    handleGoogleRedirect(@Req() request:any ,@Res() response:any) {    
        response.json(request.user)
    }

    @ApiOperation({ summary: '구글 로그인 상태를 확인하는 API' })
    @Get('google/status')
    handleGoogleStatus(@Req() request: any) {
        console.log(request.sessionStore);
        if (request.user) {
            return { msg: 'Authenticated', user: request.user };
        } else {
            return { msg: 'No Authenticated' };
        }
    }

    // 로컬 로그인
    @ApiOperation({ summary: '로컬 회원가입 요청 API' })
    @Post('local/signup')
    async handleLocalSignup(@Body() localSignupDto: LocalSignupDto): Promise<InsertResult>{
       return await this.authService.localSignup(localSignupDto);
    }

    @ApiOperation({ summary: '로컬 로그인 요청 API' })
    @UseGuards(LocalAuthGuard)
    @Post('local/login')
    async handleLocalLogin(
        @Req() request: any, @Res() response: any){
        response.json(request.user);
    }
   
    // 구글 로그아웃, 로컬 로그아웃 공용 API
    @ApiOperation({ summary: '로그아웃 uri' })
    @Get('logout')
    async handleGoogleLogout(@Req() request: any, @Res() response: any) {
        const sessionId = request.signedCookies[process.env.SESSION_COOKIE_NAME];  
        console.log('로그아웃 전 세션스토어', request.sessionStore);
        console.log('로그아웃할 세션아이디', sessionId);
        try{    
            await request.sessionStore.destroy(sessionId, (err) => {
                if (err) {
                    throw new Error(err);
                } else {
                    response.user = null;
                    response.clearCookie(process.env.SESSION_COOKIE_NAME, {signed: true});
                    response.send({msg: 'logout success'});
                }
            });
            console.log('로그아웃 후 세션스토어', request.sessionStore);
        }catch(err){
            console.log(err)
        }
    }
}
