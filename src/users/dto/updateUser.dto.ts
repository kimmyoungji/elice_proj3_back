import { IsEmail, IsNotEmpty, IsString, IsInt, IsEnum, IsOptional, IsDate, Min, IsBoolean } from 'class-validator';
import { ActivityAmount, DietGoal, Gender } from '../user.health-info.enums';


export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsDate()
  birthday: Date;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsInt()
  weight: number;

  @IsOptional()
  @IsInt()
  height: number;

  @IsOptional()
  @IsEnum(DietGoal)
  goal: DietGoal;

  @IsOptional()
  @IsInt()
  targetWeight: number;

  @IsOptional()
  @IsInt()
  targetCalories: number;

  @IsOptional()
  @IsEnum(ActivityAmount)
  activity: ActivityAmount;
}