import { IsInt, IsNotEmpty, IsUUID, IsString, IsEnum, IsOptional, IsDate, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { MealType } from '../record.entity'

class Food {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "음식 이름", example: "햄버거" })
    foodName: string;
  
    @IsInt()
    @IsNotEmpty()
    @ApiProperty({ description: "음식 수량", example: 1 })
    foodCounts: number;

    @IsString()
    @ApiProperty({ description: "음식 사진", example: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww." })
    foodImage: string;
}  

@Exclude()
export class RecordDto {
    @Expose()
    @IsUUID()
    @ApiProperty({ description: "기록 id", example: "123e4567-e89b-12d3-a456-426614174000"})
    recordId: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "사용자 id", example: "123e4567-e89b-12d3-a456-426614174000"})
    userId: string;

    @Expose()
    @IsEnum(MealType)
    @ApiProperty({ description: "식단 구분", enum: MealType, example: 1})
    mealType: MealType;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "음식/영양 정보 id", example: "123e4567-e89b-12d3-a456-426614174000"})
    foodInfoId: string;

    @Expose()
    @ValidateNested({ each: true })
    @Type(() => Food)
    @ApiProperty({ description: "음식 목록", type: [Food], example: [{foodName: "햄버거", foodCounts: 1, foodImage: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww."}]})
    foods: Food[];

    @Expose()
    @IsInt()
    @IsOptional()
    @ApiProperty({ description: "탄수화물", required: false, example: 20})
    carbohydrates?: number;

    @Expose()
    @IsInt()
    @IsOptional()
    @ApiProperty({ description: "단백질", required: false, example: 30}) 
    proteins?: number;

    @Expose()
    @IsInt()
    @IsOptional()
    @ApiProperty({ description: "지방", required: false, example: 10})
    fats?: number;

    @Expose()
    @IsInt()
    @IsOptional()
    @ApiProperty({ description: "식이섬유", required: false })
    dietaryFiber?: number;

    @Expose()
    @IsInt()
    @IsOptional()
    @ApiProperty({ description: "총 칼로리", required: false, example: 1000 })
    totalCalories?: number;

    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty({ description: "이미지", required: false, example: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww." })
    foodImage?: string;

    @Expose()
    @IsDate()
    @IsOptional()
    @ApiProperty({ description: "첫 기록 날짜", required: false, type: Date, example: "2021-05-01" })
    firstRecordDate?: Date;

    @Expose()
    @IsDate()
    @IsOptional()
    @ApiProperty({ description: "최근 수정 날짜", required: false, type: Date, example: "2021-05-01"})
    updatedDate?: Date;
}