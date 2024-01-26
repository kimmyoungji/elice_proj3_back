import { IsInt, IsNotEmpty, IsUUID, IsString, IsEnum, IsOptional, IsDate, ValidateNested, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { MealType } from '../record.entity'

class Food {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "음식 이름" })
    foodName: string;
  
    @IsInt()
    @IsNotEmpty()
    @ApiProperty({ description: "음식 수량" })
    counts: number;

    @IsArray()
    @ApiProperty({ description: "음식 사진" })
    XYCoordinate: number[];
}  

@Exclude()
export class CreateRecordDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "사용자 id" })
    userId: string;

    @Expose()
    @IsEnum(MealType)
    @ApiProperty({ description: "식단 구분", enum: MealType })
    mealType: MealType;

    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty({ description: "이미지", required: false })
    foodImageUrl?: string;

    @Expose()
    @ValidateNested({ each: true })
    @Type(() => Food)
    @ApiProperty({ description: "음식 목록", type: [Food] })
    foods: Food[];

}