
import { response, Request } from 'express';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { isLoggedInGuard } from 'src/auth/utils/isLoggedin.guard';
import { UpdateUserAndHealthInfoDto } from './dto/UpdateUserAndHealthInfo.dto';

@ApiTags('api/user')
@Controller('api/user')
export class UserController {
    constructor(private userService: UserService){}


    @ApiOperation({summary: '유저정보와 유저건강정보 가져오기'})
    @Get()
    @UseGuards(isLoggedInGuard)
    public async handleGetUserInfo(@Req() request: any, @Res() response: any){
        const result =  await this.userService.getUserAndHealthInfo(request.user.userId);
        response.status(200).json(result);
    }

    @ApiOperation( {summary: '유저정보와 유저건강정보 수정하기'} )
    @ApiBody({ type: UpdateUserAndHealthInfoDto })
    @ApiResponse({ status: 204, description: '유저정보와 유저건강정보 수정 성공.'})
    @ApiResponse({ status: 401, description: '로그인이 필요합니다.'})
    @ApiResponse({ status: 404, description: '해당 유저를 찾을 수 없습니다.'})
    @Put()
    @UseGuards(isLoggedInGuard)
    public async updateUserInfo(
        @Req() request: any, 
        @Body() updateUserAndHealthInfoDto: UpdateUserAndHealthInfoDto, 
        @Res() response: any){
                console.log('사용자 정보 업데이트 시작...')
                const result = await this.userService.updateUserAndHealthInfo(request.user.userId, updateUserAndHealthInfoDto);
                response.status(204).send(result);      
    }

}
