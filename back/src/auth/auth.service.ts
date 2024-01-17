import { LocalSignupDto } from './dto/localSignupDto';
import { GoogleLoginDto } from './dto/googleLoginDto';
import { User } from '../user/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource, InsertResult } from 'typeorm';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly dataSource: DataSource
    ) {}

    async findByEmailOrSave(googleLoginDto: GoogleLoginDto): Promise<User> {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            // 이미 등록된 유저인지 확인
            const user = await this.userRepository.findUserByEmail(googleLoginDto.email, queryRunner.manager);
            if (user && user.providerId) return user;
            else if (user && !user.providerId) throw new Error('이미 로컬계정으로 등록된 이메일입니다.')

            // 등록되지 않은 유저라면 가입
            const newUser = new User().mapGoogleLoginDto(googleLoginDto);
            const saveResult = this.userRepository.saveUser(newUser, queryRunner.manager);
            await queryRunner.commitTransaction();

            console.log('saveResult', saveResult);
            return newUser;
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }

    async findOneByUserId(userId: string): Promise<User> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            return await this.userRepository.findUserByUserId(userId, queryRunner.manager);
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }

    async findOneByEmail(email: string): Promise<User> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            return await this.userRepository.findUserByEmail(email, queryRunner.manager);
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }

    async findByEmailAndCheckPw(email: string, password: string): Promise<User> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const user = await this.userRepository.findUserByEmail(email, queryRunner.manager);
            if(user){
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    delete user.password;
                    return user; // 로그인 성공
                }
            }
            return null; // 로그인 실패
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }

    async localSignup(localSignupDto: LocalSignupDto): Promise<InsertResult> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
             // email password displayName 받아오기
            const {email} = localSignupDto;
            // 가입된 이메일인지 확인하기
            const user = await this.userRepository.findUserByEmail(email, queryRunner.manager);
            // 가입된 이메일이면 에러 던지기
            if(user) {
                // 만약 providerId가 있다면 구글계정으로 이미등록되어 있다는 메세지의 에러 전송
                if(user.providerId) throw new Error('이미 구글계정으로 등록된 이메일입니다.');
                // 만약 providerId가 없다면 로컬계정으로 이미등록되어 있다는 메세지의 에러 전송
                else throw new Error('이미 로컬계정으로 등록된 이메일입니다.');
            }
           
            // 가입되지 않은 이메일이면 
            // newUser 생성하기
            const newUser = new User().mapLocalSignupDto(localSignupDto);
            // saveUser 호출하기
            const saveResult = await this.userRepository.saveUser(newUser, queryRunner.manager);
            console.log('saveResult',saveResult)
            await queryRunner.commitTransaction();
            return saveResult;
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }
}
