import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    // 유저정보와 유저건강정보 수정하기
    public async updateUserInfoAndHealthInfo(){

    }

    // 유저정보과 유저건강정보 가져오기
    public async getUserInfoAndHealthInfo(){

    }

}
