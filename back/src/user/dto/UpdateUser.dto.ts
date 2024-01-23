import { ApiProperty } from "@nestjs/swagger";
import { HealthInfo } from "../entities/health-info.entity";
import { Gender } from "../utils/user.enums";

export class UpdateUserDto {

  @ApiProperty({ type: String, description: 'email', example: 'testUpdated@test.com' })
  email: string;

  @ApiProperty({ type: String, description: 'providerId', example: null })
  providerId: string;

  @ApiProperty({ type: String, description: 'password', example: '1234' })
  password: string;

  @ApiProperty({ type: String, description: 'username', example: 'test_updated' })
  username: string;

  @ApiProperty({ type: Date, description: 'birthDay', example: '1995-11-11' })
  birthDay: Date;

  @ApiProperty({description: 'gender', example: 2})
  gender: Gender;

  @ApiProperty({ type: String, description: 'profileImage', example: 'https://ggu-s302.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A1%E1%84%80%E1%85%B5_2.png' })
  profileImage: string;

  @ApiProperty({ type: Boolean, description: 'membership', example: false })
  membership: boolean;

  @ApiProperty({ type: HealthInfo, description: 'healthInfo', example: null })
  healthInfo: HealthInfo;
  
}