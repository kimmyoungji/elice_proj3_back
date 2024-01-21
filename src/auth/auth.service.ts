import { HealthInfo } from 'src/user/entities/health-info.entity';
import { HealthInfoRepository } from '../user/health-info.repository';
import { LocalSignupDto } from './dto/localSignupDto';
import { GoogleLoginDto } from './dto/googleLoginDto';
import { User } from '../user/entities/user.entity';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource, InsertResult } from 'typeorm';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly healthInfoRepository: HealthInfoRepository,
        private readonly dataSource: DataSource
    ) {}

    // 구글 로그인 메서드  (구글계정 등록 여부 확인 및 등록 기능)
    // 로그인 성공시 user 반환, super.login() 호출O, 그리고 session에 user 정보 저장O
    // 로그인 실패시 null 반환, super.login() 호출X, 그리고 session에 user 정보 저장X
    async validateGoogleOauthUser(googleLoginDto: GoogleLoginDto): Promise<any> {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            // 이미 등록된 유저인지 확인
            const user = await this.userRepository.findUserByEmail(googleLoginDto.email, queryRunner.manager);
            if(user) {
                console.log(user.providerId);
                if(user.providerId) return user;
                else throw new HttpException('이미 로컬계정으로 등록된 이메일입니다.',HttpStatus.CONFLICT);
            }
            
            // 등록되지 않은 유저라면 가입
            const newUser = new User().mapGoogleLoginDto(googleLoginDto);
            await this.userRepository.saveUser(newUser, queryRunner.manager);
            
            await queryRunner.commitTransaction();
            return newUser;

        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }

    // 로컬 로그인 메서드  (로컬 회원등록 여부 확인 및 비밀번호 검증 기능)
    // 로그인 성공시 user 반환, super.login() 호출O, 그리고 session에 user 정보 저장O
    // 로그인 실패시 null 반환, super.login() 호출X, 그리고 session에 user 정보 저장X
    async validateLocalUser(email: string, password: string): Promise<User> {
        
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            const user = await this.userRepository.findUserByEmail(email, queryRunner.manager);
            // 등록된 유저인지 확인
            if(user){
                // 비밀번호 검증
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    delete user.password;
                    await queryRunner.commitTransaction();
                    return user; // 로그인 성공
                }
                else throw new HttpException('비밀번호가 일치하지 않습니다.', HttpStatus.UNAUTHORIZED);
            }
            else throw new HttpException('등록되지 않은 이메일입니다.', HttpStatus.UNAUTHORIZED);
            
            // return null; // 로그인 실패
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }

    // 구글 회원가입 메서드는 없다. 구글계정은 로그인시에 자동으로 회원가입이 된다.

    // 로컬 회원가입 메서드
    async localSignup(localSignupDto: LocalSignupDto): Promise<InsertResult> {
        
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        try{
             // email password username 받아오기
            const {email} = localSignupDto;
            // 가입된 이메일인지 확인하기
            const user = await this.userRepository.findUserByEmail(email, queryRunner.manager);
            // 가입된 이메일이면 에러 던지기
            if(user) {
                // 만약 providerId가 있다면 구글계정으로 이미등록되어 있다는 메세지의 에러 전송
                if(user.providerId) throw new HttpException('이미 구글계정으로 등록된 이메일입니다.', HttpStatus.CONFLICT);
                // 만약 providerId가 없다면 로컬계정으로 이미등록되어 있다는 메세지의 에러 전송
                else throw new HttpException('이미 로컬계정으로 등록된 이메일입니다.',HttpStatus.CONFLICT);
            }
           
            // 가입되지 않은 이메일이면 
            // newUser 생성하기
            const newUser = new User().mapLocalSignupDto(localSignupDto);
            // saveUser 호출하기
            const result = await this.userRepository.saveUser(newUser, queryRunner.manager);
            await queryRunner.commitTransaction();
            return result;
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }

    // deserializeUser에서 호출됨, 로그인시에 사용자 정보를 세션에 저장하기 위한 메서드
    async findOneByUserId(userId: string): Promise<User> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            const result = await this.userRepository.findUserByUserId(userId, queryRunner.manager);
            await queryRunner.commitTransaction();
            return result;
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }

    // 회원 탈퇴 메서드
    async withdrawal(userId: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        try{
            const tempUser = await this.userRepository.findUserAndHealthInfoByUserId(userId, queryRunner.manager)
            if (!tempUser) throw new HttpException('유저 정보를 찾을 수 없습니다.', HttpStatus.UNAUTHORIZED);
            const result1 = await this.healthInfoRepository.deleteHealthInfoByHealthInfoId(tempUser.healthInfo.healthInfoId, queryRunner.manager);
            const result2 = await this.userRepository.softDeleteUserByUserId(userId, queryRunner.manager );
            if( result1.affected !== 1 || result2.affected !== 1 ) throw new HttpException('회원탈퇴 실패', HttpStatus.INTERNAL_SERVER_ERROR);
            await queryRunner.commitTransaction();
            return {result1, result2};
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            await queryRunner.release();
        }
    }
}