// import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
// import { UsersService } from './old.users.service';
// import { LoginUserDto } from './dto/loginUser.dto';
// import { SignUpUserDto } from './dto/signUpUpser.dto';
// import { UpdateUserDto } from './dto/updateUser.dto';

// @Controller('users')
// export class UsersController {
//     constructor(private usersService: UsersService) {}

//     // login / post
//     @Post('/login')
//     async login(@Body() loginUserDto: LoginUserDto) {
//         return await this.usersService.login(loginUserDto);
//     }

//     // logout/ get
//     @Get('/logout')
//     async logout() {
//         return await this.usersService.logout();
//     }

//     @Get()
//     async findAll() {
//         return await this.usersService.findAll();
//     }

//     // register/ post
//     @Post()
//     async singUp(@Body() signUpUserDto: SignUpUserDto) {
//         return await this.usersService.signUp(signUpUserDto);
//     }

//     // update_user_info / put
//     @Put('/:user_id')
//     async updateUserInfo(
//         @Body() updateUserDto: UpdateUserDto,
//         @Param('user_id') userId: string,
//     ) {
//         return await this.usersService.updateUserInfo(userId, updateUserDto);
//     }

//     // delete_user/ delete
//     @Delete('/:user_id')
//     async delete(@Param('user_id') userId: string) {
//         return await this.usersService.deleteUser(userId);
//     }
// }
