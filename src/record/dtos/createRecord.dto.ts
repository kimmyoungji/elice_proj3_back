import { IsInt, IsNotEmpty, IsUUID, IsString, IsEnum, IsOptional, IsDate, ValidateNested } from "class-validator";
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

    @IsString()
    @ApiProperty({ description: "음식 사진" })
    XYCoordinate: number[];
}  

@Exclude()
export class CreateRecordDto {
    @Expose()
    @IsUUID()
    @ApiProperty({ description: "기록 id" })
    recordId: string;

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