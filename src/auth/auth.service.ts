import { GoogleUserProfileDto } from './dto/googleUserProfile.dto';
import { User } from './entites/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findByEmailOrSave(providerId:string, email:string, displayName:string): Promise<User> {
        // 이미 가입된 유저인지 확인
        const user = await this.userRepository.findOneBy({email, providerId});
        if (user) return user;

        // 가입되지 않은 유저라면 가입
        const googleLoginUserDto = { providerId, email, displayName } as GoogleUserProfileDto;
        const newUser = new User().toUserEntity(googleLoginUserDto);
        return await this.userRepository.save(newUser);
    }

    async findOneBy(id: string) {
        const User =  this.userRepository.findOneBy({id});
        return User;
    }
}
