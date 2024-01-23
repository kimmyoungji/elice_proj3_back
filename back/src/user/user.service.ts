import { HealthInfo } from 'src/user/entities/health-info.entity';
import { HealthInfoRepository } from './health-info.repository';
import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';


@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly healthInfoRepository: HealthInfoRepository,
        private readonly dataSource: DataSource
    ) {}

    // create user
    public async saveUser(createUserDto: CreateUserDto){
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const user = new User().mapCreateUserDto(createUserDto);
            await this.userRepository.saveUser(user, queryRunner.manager);
            await queryRunner.commitTransaction();
            return '등록 성공';

        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }   
    }

    // get user by userId
    public async getUserByUserId(userId:string){
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            // 등록된 사용자 정보 가져오기;
            let user = await this.userRepository.findUserAndHealthInfoByUserId(userId, queryRunner.manager);
            if (!user) throw new HttpException('해당 유저를 찾을 수 없습니다.', 404); 

            await queryRunner.commitTransaction();
            return user;

        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }   
    }

    // update user by userId
    public async updateUserByUserId(userId:string, updateUserDto: UpdateUserDto){
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const userToUpdate = new User().mapUpdateUserDto(updateUserDto);
            await this.userRepository.updateUserByUserId(userId, userToUpdate, queryRunner.manager);
            return '수정 성공';

        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }   
    }


    // delete user by userId
    public async deleteUserByUserId(userId:string){
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const result1 = await this.userRepository.softDeleteUserByUserId(userId, queryRunner.manager);
            return '삭제 성공';

        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }   
    }

}
