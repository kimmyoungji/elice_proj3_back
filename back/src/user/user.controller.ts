
import { response, Request } from 'express';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { isLoggedInGuard } from 'src/auth/utils/isLoggedin.guard';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { SaveHealthInfoDto } from './dto/SaveHealthInfo.dto';
import { handleUpdateUserInfosDto } from './dto/handleUpdateUserInfos.dto';

@ApiTags('api/user')
@Controller('api/user')
export class UserController {
    constructor(private userService: UserService){}


    @ApiOperation({summary: '유저정보와 유저건강정보 가져오기'})
    @Get()
    @UseGuards(isLoggedInGuard)
    public async handleGetUserInfos(@Req() request: any, @Res() response: any){
        const result =  await this.userService.getUserInfos(request.user.userId);
        console.log(result);
        response.status(200).json(result);
    }

    @ApiOperation( {summary: '유저정보와 유저건강정보 수정하기'} )
    @ApiResponse({ status: 204, description: '유저정보와 유저건강정보 수정 성공.'})
    @ApiResponse({ status: 401, description: '로그인이 필요합니다.'})
    @ApiResponse({ status: 404, description: '해당 유저를 찾을 수 없습니다.'})
    @ApiBody({ type: handleUpdateUserInfosDto })
    @Put()
    @UseGuards(isLoggedInGuard)
    public async handleUpdateUserInfos(
        @Req() request: any, 
        @Body() updateUserInfosDto: UpdateUserDto | SaveHealthInfoDto, 
        @Res() response: any){
                console.log('사용자 정보 업데이트 시작...')
                const result = await this.userService.updateUserInfos(request.user.userId, updateUserInfosDto);
                response.status(204).send(result);      
    }
}
