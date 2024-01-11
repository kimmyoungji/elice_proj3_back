import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { SignUpUserDto } from './dto/signUpUpser.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    // login / post
    // @Post('/login')
    // async login(@Body() loginUserDto: LoginUserDto) {
    //     return await this.usersService.login(loginUserDto);
    // }

    // logout/ get
    // @Get('/logout')
    // async logout() {
    //     return await this.usersService.logout();
    // }

    // register/ post
    @Post()
    async singUp(@Body() signUpUserDto: SignUpUserDto) {
        return await this.usersService.signUp(signUpUserDto);
    }

    // update_user_info / put
    // @Put('/update')
    // async update(@Body() updateUserDto: UpdateUserDto) {
    //     return await this.usersService.update(updateUserDto);
    // }

    // delete_user/ delete
    // @Delete('/delete')
    // async delete(@Body() deleteUserDto: DeleteUserDto) {
    //     return await this.usersService.delete(deleteUserDto);
    // }
}
