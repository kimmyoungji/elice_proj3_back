import { IsDate, IsString } from "class-validator";


export class CreateImageDto {
    @IsString()
    recordId: string;

    @IsString()
    foodImgUrl: string;
}