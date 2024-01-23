import { IsDate, IsString } from "class-validator";


export class CreateImageDto {

    @IsString()
    imageId: string;

    @IsString()
    recordId: string;

    @IsString()
    image: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    @IsDate()
    deletedAt: Date;
}