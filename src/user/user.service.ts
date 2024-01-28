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
import { snakeTocamel } from 'src/util/snake-to-camel';


@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly healthInfoRepository: HealthInfoRepository,
        private readonly dataSource: DataSource
    ) {}

    /* 유저정보들 가져오기 */
    public async getUserInfos(userId:string): Promise<User & HealthInfo>{
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            // 등록된 사용자 정보 가져오기;
            const user: User = await this.userRepository.findUserInfosByUserId(userId, queryRunner.manager);
            if (!user) throw new HttpException('해당 유저를 찾을 수 없습니다.', 404); 

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

            // 권장영양정보 객체로 변환하기
            if (user && user[0] && user[0].recommend_intake) {
                user[0].recommend_intake = {
                    carbohydrate: user[0].recommend_intake[0],
                    protein: user[0].recommend_intake[1],
                    fat: user[0].recommend_intake[2],
                    dietary_fiber: user[0].recommend_intake[3],
                }
            }

            //스네이크케이스 -> 카멜케이스
            const userObj = snakeTocamel(user[0]);

            await queryRunner.commitTransaction();
            return userObj as User & HealthInfo;

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

            // recommnedIntake를 배열로 변환하기
            if(saveHealthInfoDto.recommendIntake){
                saveHealthInfoDto.recommendIntake = Object.values(saveHealthInfoDto.recommendIntake);
            }
            // console.log(saveHealthInfoDto.recommendIntake)
            // saveHealthInfoDto.recommendIntake = Object.values(saveHealthInfoDto.recommendIntake);

            const userToUpdate = new User().mapUpdateUserDto(updateUserDto);
            let newHealthInfos = new HealthInfo().mapHealthInfoDto(saveHealthInfoDto);
            let healthInfo: HealthInfo = await this.healthInfoRepository.findRecentHealthInfoByUserId(userId, queryRunner.manager);

            if(healthInfo){
                const healthInfosToSave = {...healthInfo, ...newHealthInfos};
                delete healthInfosToSave.updatedDate;
                delete healthInfosToSave.deletedDate;
                healthInfosToSave.healthInfoId = newHealthInfos.healthInfoId;
                healthInfosToSave.userId = userId;
                userToUpdate.recentHealthInfoId = healthInfosToSave.healthInfoId;
                // console.log('저장하기 직전',healthInfosToSave)
                const result = await this.healthInfoRepository.saveHealthInfo(healthInfosToSave as HealthInfo, queryRunner.manager);
                // console.log(result)
            }else{
                delete newHealthInfos.updatedDate;
                delete newHealthInfos.deletedDate;
                userToUpdate.recentHealthInfoId = newHealthInfos.healthInfoId;
                newHealthInfos.userId = userId;
                // console.log('저장하기 직전',newHealthInfos)
                const result = await this.healthInfoRepository.saveHealthInfo(newHealthInfos, queryRunner.manager);
                // console.log(result);
            }

            // 닉네임 중복검사
            if(userToUpdate.username){
                const user = await this.userRepository.findUserByUserName(userToUpdate.username, queryRunner.manager);
                if(user){
                    throw new HttpException('이미 존재하는 닉네임입니다.', 409);
                }
            }
            
            const result = await this.userRepository.updateUserByUserId(userId, userToUpdate, queryRunner.manager);
            // console.log(result)

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
