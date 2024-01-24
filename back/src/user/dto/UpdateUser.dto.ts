import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { Gender } from "../utils/user.enums"
import { ActivityAmount, DietGoal } from "../utils/health-info.enums"
import { User } from "../entities/user.entity"
import { HealthInfo } from "../entities/health-info.entity"

export class UpdateUserDto{

    @ApiProperty( { example: 'testUser', description: '유저의 아이디' } )
    @IsString()
    @IsOptional()
    username: string

    @ApiProperty( { example: 'password', description: '유저의 비밀번호' } )
    @IsString()
    @IsOptional()
    password: string

    @ApiProperty({ example: '1999-01-01', description: '생년월일'  } )
    @IsDate()
    @IsOptional()
    birthDay: Date

    @ApiProperty( { example: 1, description: '1:MALE, 2:FEMALE, 3:OTHER ' } )
    @IsOptional()
    gender: string

    @ApiProperty( { example: '이미지url', description:'사용자 프로필 사진 url링크' } )
    @IsString()
    @IsOptional()
    profileImage: string

    @ApiProperty( { example: true, description: '유료 멤버십 여부' } )
    @IsBoolean()
    @IsOptional()
    membership: boolean

}