import { IsEmail, IsNotEmpty, IsString, IsInt, IsEnum, IsOptional, IsDate, Min, IsBoolean } from 'class-validator';
import { ActivityAmount, DietGoal, Gender } from '../user.health-info.enums';
import { v4 as uuidv4} from 'uuid';


export class SignUpUserDto {

  userId = null;

  @IsNotEmpty()
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


