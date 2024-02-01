import { Expose } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class sendVerificationCodeDto {
    @ApiProperty({example:'your email'})
    @IsNotEmpty()
    @IsString()
    email: string;
}