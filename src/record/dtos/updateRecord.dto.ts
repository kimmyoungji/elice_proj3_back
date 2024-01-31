import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { MealType } from '../record.entity';

export class FoodUpdateDto {
   @IsString()
   @IsNotEmpty()
   @ApiProperty({ description: "음식Id" })
   foodInfoId: string;
   
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
export class UpdateRecordDto {
   @Expose()
   @IsInt()
   @ApiProperty({ description: "식단 구분", enum: MealType })
   mealType: number;

   @Expose()
   @IsString()
   @IsOptional()
   @ApiProperty({ description: "이미지", required: false })
   imgUrl: string;

   @Expose()
   @ValidateNested({ each: true })
   @Type(() => FoodUpdateDto)
   @ApiProperty({ description: "음식 목록", type: [FoodUpdateDto] })
   foods: FoodUpdateDto[];
}