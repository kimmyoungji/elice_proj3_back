import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/google.guard';

@Controller('auth')
export class AuthController {
    // api/auth/google/login
    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        return { msg: 'google authentification' };
    }

    // api/auth/google/redirect
    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard) // 여기서 req.user에 user 정보가 담김
    handleRedirect() {
        return { msg: 'OK' };
    }
    
    // api/auth/google/status
    @Get('google/status')
    handleStatus(@Req() request: any) {
        if (request.user) {
            return { msg: 'Authenticated', user: request.user };
        } else {
            return { msg: 'No Authenticated' };
        }
    }

    //api/auth/google/logout
    @Get('google/logout')
    async handleLogout(@Req() request: any, @Res() response: any) {
        const sessionId = request.signedCookies[process.env.SESSION_COOKIE_NAME];  
        try{    
            const result = await request.sessionStore.destroy(sessionId, (err) => {
            if (err) {
                throw new Error(err);
            } else {
                response.user = null;
                response.clearCookie(process.env.SESSION_COOKIE_NAME, {signed: true});
                response.send({msg: 'logout success'});
            }
        });
        }catch(err){
            console.log(err)
        }
    }

    

    
}
