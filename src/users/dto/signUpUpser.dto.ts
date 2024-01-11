import { IsEmail, IsNotEmpty, IsString, IsInt, IsEnum, IsOptional, IsDate, Min, IsBoolean } from 'class-validator';
import { ActivityAmount, DietGoal, Gender } from '../user.health-info.enums';


export class SignUpUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsDate()
  birthday: Date;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsInt()
  weight: number;

  @IsNotEmpty()
  @IsInt()
  height: number;

  @IsNotEmpty()
  @IsEnum(DietGoal)
  goal: DietGoal;

  @IsNotEmpty()
  @IsInt()
  targetWeight: number;

  @IsOptional()
  @IsInt()
  targetCalories: number;

  @IsNotEmpty()
  @IsEnum(ActivityAmount)
  activity: ActivityAmount;
}


