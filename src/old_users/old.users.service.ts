// import { UpdateUserDto } from './dto/updateUser.dto';
// import { LoginUserDto } from './dto/loginUser.dto';
// import { HealthInfoRepository } from './repositories/health-info.repository';
// import { HttpException, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { UsersRepository} from './repositories/old.users.repository';
// import { SignUpUserDto } from './dto/signUpUpser.dto';
// import { v4 as uuidv4} from 'uuid';
// import { User } from './entities/old.user.entity';
// import { HealthInfo } from './entities/health-info.entity';
// import { sign } from 'crypto';

// @Injectable()
// export class UsersService {
//     constructor(
//         @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
//         @InjectRepository(HealthInfoRepository) private healthInfoRepository: HealthInfoRepository,
//     ) {}

//      async findAll() {
//         return await this.usersRepository.find();
//     }

//     async login(LoginUserDto: LoginUserDto) {
//         // 이메일로 가입 여부 확인
//         const user = await this.usersRepository.findUserByEmail(LoginUserDto.email);
//         // 가입되어 있으면 비밀번호 확인
//         if (user) {
//             if (user.password === LoginUserDto.password) {
//                 return user;
//             } else {
//                 throw new HttpException('비밀번호가 일치하지 않습니다.', 401);
//             }
//         } else {
//             throw new HttpException('가입되지 않은 이메일입니다.', 401);
//         }       
//     }

//     async logout() { 
//         return '로그아웃 되었습니다.';
//     }

//     async signUp(signUpUserDto: SignUpUserDto) {

//         // userId 생성
//         signUpUserDto.userId = uuidv4();

//         // signUpUserDto -> User Entity Type
//         const newUser = new User();
//         newUser.signUpUserDtoToEntity(signUpUserDto);

//         // signUpUserDto -> HealthInfo Entity Type
//         const newHealthInfo = new HealthInfo();
//         newHealthInfo.signUpUserDtotoEntity(signUpUserDto);

//         const result1 = await this.usersRepository.createUser(newUser);
//         const result2 = await this.healthInfoRepository.createHealthInfo(newHealthInfo);
//         return { result1, result2 };
//     }

//     async updateUserInfo(userId: string, updateUserDto: UpdateUserDto) {

//         // updteUserDto -> User Entity Type
//         const newUser = new User();
//         newUser.UpdateUserDtoToEntity(updateUserDto);

//         // updteUserDto -> HealthInfo Entity Type
//         const newHealthInfo = new HealthInfo();
//         newHealthInfo.updateUserDtoToEntity(updateUserDto);

//         const userInfoUpdateResult =  await this.usersRepository.update(userId, newUser);
//         const HealthInfoUpdateResult =  await this.healthInfoRepository.update(userId, newHealthInfo);
//         console.log(newUser, newHealthInfo)
//         return { userInfoUpdateResult, HealthInfoUpdateResult };
//     }

//     async deleteUser(userId: string) {
//         const userInfoDeleteResult = await this.usersRepository.softDelete(userId);
//         return { userInfoDeleteResult };
//     }
// }
