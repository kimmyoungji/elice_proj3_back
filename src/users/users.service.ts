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
}
