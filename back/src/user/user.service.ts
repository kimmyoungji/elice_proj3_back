import { Update } from 'aws-sdk/clients/dynamodb';
import { HealthInfo } from 'src/user/entities/health-info.entity';
import { HealthInfoRepository } from './health-info.repository';
import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { SaveHealthInfoDto } from './dto/SaveHealthInfo.dto';


@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly healthInfoRepository: HealthInfoRepository,
        private readonly dataSource: DataSource
    ) {}

    public async getUserAndHealthInfo(userId:string){
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            
            // 등록된 사용자 정보 가져오기;
            let user = await this.userRepository.findUserInfosByUserId(userId, queryRunner.manager);
            if (!user) throw new HttpException('해당 유저를 찾을 수 없습니다.', 404); 

            // 만약 유저의 healthInfo가 null이라면 사용자 건강 정보 등록하기
            if(user.healthInfo === null){
                // healthInfo tabel에 등록하기
                const newHealthInfo = new HealthInfo();
                await this.healthInfoRepository.saveHealthInfo(newHealthInfo, queryRunner.manager);
                await this.userRepository.updateHealthInfoIdByUserId(userId, newHealthInfo.healthInfoId, queryRunner.manager);
                user =  await this.userRepository.findUserInfosByUserId(userId, queryRunner.manager);
            }

            await queryRunner.commitTransaction();
            return user;

        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }   
    }

    // 유저정보와 유저건강정보 수정하기
    public async updateUserAndHealthInfo(userId:string, updateUserInfos: UpdateUserDto | SaveHealthInfoDto){
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            // updateUserInfos에서 유저정보와 유저건강정보 분리해내기
            const updateUserDto = updateUserInfos as UpdateUserDto;
            const saveHealthInfoDto = updateUserInfos as SaveHealthInfoDto;

            // user, healthInfo 가져오기
            const user = await this.userRepository.findUserInfosByUserId(userId, queryRunner.manager);
            const healthInfo = await this.healthInfoRepository.findRecentHealthInfo(user.recentHealthInfoId, queryRunner.manager);

            // healthInfoToSave 만들고 저장하기
            const newHealthInto = Object.assign(healthInfo, saveHealthInfoDto);
            console.log(newHealthInto);
            await this.healthInfoRepository.saveHealthInfo(newHealthInto, queryRunner.manager);

            // user 수정하기
            updateUserDto.recentHealthInfoId = newHealthInto.healthInfoId;


            await queryRunner.commitTransaction();
            return '유저정보 및 유저건강정보 업데이트 성공';

        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }   
    }

    // 유저 건강정보 삭제하기
    public async deleteHealthInfoByUserId(userId:string){
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            // userId에 해당되는 아이디 가져오기
            const user = await this.userRepository.findUserInfosByUserId(userId, queryRunner.manager);
            if(!user) throw new HttpException('해당 유저를 찾을 수 없습니다.', 404);
            // user의 healthInfoId 가져오기
            const healthInfoId = user.recentHealthInfoId;
            // healthInfoId에 해당되는 건강정보 삭제하기
            const result1 = await this.healthInfoRepository.deleteHealthInfoByHealthInfoId(healthInfoId, queryRunner.manager);
            if (result1.affected === 0) throw new HttpException('유저 건강정보 삭제 실패', 500);
            await queryRunner.commitTransaction();
            return '유저 건강정보 삭제 성공';
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }   
    }   

}
