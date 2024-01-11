import { UpdateUserDto } from './dto/updateUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { HealthInfoRepository } from './health-info.repository';
import { ActivityAmount } from './user.health-info.enums';
import { DietGoal, Gender } from './user.health-info.enums';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository} from './users.repository';
import { SignUpUserDto } from './dto/signUpUpser.dto';
import { v4 as uuidv4} from 'uuid';
import { User } from './user.entity';
import { HealthInfo } from './health-info.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
        @InjectRepository(HealthInfoRepository) private healthInfoRepository: HealthInfoRepository,
    ) {}

     async findAll() {
        return await this.usersRepository.find();
    }

    async login(LoginUserDto: LoginUserDto) {
        // 이메일로 가입 여부 확인
        const user = await this.usersRepository.findUserByEmail(LoginUserDto.email);
        // 가입되어 있으면 비밀번호 확인
        if (user) {
            if (user.password === LoginUserDto.password) {
                return user;
            } else {
                return '비밀번호가 일치하지 않습니다.';
            }
        } else {
            return '가입되어 있지 않은 이메일입니다.';
        }       
    }

    async logout() { 
        return '로그아웃 되었습니다.';
    }

    async signUp(signUpUserDto: SignUpUserDto) {

        // signUpUserDto -> User Entity Type
        const newUser = new User();
        newUser.user_id = uuidv4();
        newUser.email = signUpUserDto.email;
        newUser.username = signUpUserDto.username;
        newUser.password = signUpUserDto.password;
        newUser.birthday = signUpUserDto.birthday;
        newUser.gender = signUpUserDto.gender;

        // signUpUserDto -> HealthInfo Entity Type
        const newHealthInfo = new HealthInfo();
        newHealthInfo.user_id = newUser.user_id;
        newHealthInfo.weight = signUpUserDto.weight;
        newHealthInfo.height = signUpUserDto.height;
        newHealthInfo.goal = signUpUserDto.goal;
        newHealthInfo.target_weight = signUpUserDto.targetWeight;
        newHealthInfo.target_calories = signUpUserDto.targetCalories;
        newHealthInfo.activity_amount = signUpUserDto.activity;

        const result1 = await this.usersRepository.createUser(newUser);
        const result2 = await this.healthInfoRepository.createHealthInfo(newHealthInfo);
        return { result1, result2 };
    }

    async updateUserInfo(userId: string, updateUserDto: UpdateUserDto) {

        // updteUserDto -> User Entity Type
        const newUser = new User();
        newUser.username = updateUserDto.username;
        newUser.birthday = updateUserDto.birthday;
        newUser.gender = updateUserDto.gender;

        // updteUserDto -> HealthInfo Entity Type
        const newHealthInfo = new HealthInfo();
        newHealthInfo.weight = updateUserDto.weight;
        newHealthInfo.height = updateUserDto.height;
        newHealthInfo.goal = updateUserDto.goal;
        newHealthInfo.target_weight = updateUserDto.targetWeight;
        newHealthInfo.target_calories = updateUserDto.targetCalories;
        newHealthInfo.activity_amount = updateUserDto.activity;

        const userInfoUpdateResult =  await this.usersRepository.update(userId, newUser);
        const HealthInfoUpdateResult =  await this.healthInfoRepository.update(userId, newHealthInfo);
        console.log(newUser, newHealthInfo)
        return { userInfoUpdateResult, HealthInfoUpdateResult };
    }

    async deleteUser(userId: string) {
        const userInfoDeleteResult = await this.usersRepository.softDelete(userId);
        return { userInfoDeleteResult };
    }
}
