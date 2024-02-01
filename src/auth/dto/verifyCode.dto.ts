import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";

export class VerifyCodeDto {

    @ApiProperty({example:'your email'})
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({example:'sent code'})
    @IsNotEmpty()
    @IsString()
    code: string;
}