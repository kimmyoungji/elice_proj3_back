import { Update } from 'aws-sdk/clients/dynamodb';
import { HealthInfo } from 'src/user/entities/health-info.entity';
import { HealthInfoRepository } from './health-info.repository';
import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { SaveHealthInfoDto } from './dto/SaveHealthInfo.dto';
import { calculateAge } from 'src/util/calculate-age';


@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly healthInfoRepository: HealthInfoRepository,
        private readonly dataSource: DataSource
    ) {}

    /* 유저정보들 가져오기 */
    public async getUserInfos(userId:string){
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            // 등록된 사용자 정보 가져오기;
            const user: User = await this.userRepository.findUserInfosByUserId(userId, queryRunner.manager);
            if (!user) throw new HttpException('해당 유저를 찾을 수 없습니다.', 404); 
            await queryRunner.commitTransaction();

            // 불필요한 정보 지워주기
            delete user[0].password;
            delete user[0].provider_id;
            delete user[0].created_date;
            delete user[0].updated_date;
            delete user[0].deleted_date;
            delete user[0].health_info_id;
            delete user[0].user_id;

            // 나이정보 추가하기
            user[0].age = calculateAge(user[0].birth_day);

            return user[0];

        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }   
    }

    /* 유저개인정보 수정 & 유저건강정보 새로저장 */
    public async updateUserInfos(userId:string, updateUserInfos: UpdateUserDto | SaveHealthInfoDto){
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            // updateUserInfos에서 유저정보와 유저건강정보 분리해내기
            const updateUserDto = updateUserInfos as UpdateUserDto;
            const saveHealthInfoDto = updateUserInfos as SaveHealthInfoDto;

            // userId로 유저정보 가져오기
            const healthInfo: HealthInfo = await this.healthInfoRepository.findRecentHealthInfoByUserId(userId, queryRunner.manager);

            const userToUpdate = new User().mapUpdateUserDto(updateUserDto);
            const newHealthInfos = new HealthInfo().mapHealthInfoDto(saveHealthInfoDto);
            Object.assign(healthInfo, newHealthInfos);
            delete healthInfo.updatedDate;
            userToUpdate.recentHealthInfoId = healthInfo.healthInfoId;

            const result1 = await this.healthInfoRepository.saveHealthInfo(healthInfo, queryRunner.manager);
            const result2 = await this.userRepository.updateUserByUserId(userId, userToUpdate, queryRunner.manager);
            // console.log(result1, result2)

            await queryRunner.commitTransaction();
            return '유저정보 및 유저건강정보 업데이트 성공';

        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }   
    }

}
