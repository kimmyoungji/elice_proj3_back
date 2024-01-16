import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class GoogleUserProfileDto {
    @IsNotEmpty()
    @IsString()
    providerId: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    displayName: string;
}