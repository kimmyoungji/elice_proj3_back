
import { response, Request } from 'express';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { isLoggedInGuard } from 'src/auth/utils/guards/isLoggedin.guard';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { SaveHealthInfoDto } from './dto/SaveHealthInfo.dto';
import { handleUpdateUserInfosDto } from './dto/handleUpdateUserInfos.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}


    @ApiOperation({summary: '유저정보와 유저건강정보 가져오기'})
    @UseGuards(isLoggedInGuard)
    @Get()
    public async handleGetUserInfos(@Req() request: any, @Res() response: any){
        const result =  await this.userService.getUserInfos(request.user.userId);
        response.status(200).json(result);
    }

    @ApiOperation( {summary: '유저정보와 유저건강정보 수정하기'} )
    @ApiBody({ type: handleUpdateUserInfosDto })
    @UseGuards(isLoggedInGuard)
    @Put()
    public async handleUpdateUserInfos(
        @Req() request: any, 
        @Body() updateUserInfosDto: UpdateUserDto | SaveHealthInfoDto, 
        @Res() response: any){
                console.log('사용자 정보 업데이트 시작...')
                await this.userService.updateUserInfos(request.user.userId, updateUserInfosDto);
                response.status(200).send('유저정보 및 유저건강정보 업데이트 성공');    
    }
}
