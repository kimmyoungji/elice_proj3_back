import { Matches, MaxLength, IsString, MinLength, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accpepts english and number',
  })
  password: string;
}