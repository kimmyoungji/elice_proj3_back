import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { MealType } from '../record.entity';

export class FoodUpdateDto {
   @IsString()
   @IsNotEmpty()
   @ApiProperty({ description: "음식 이름" })
   foodName: string;

   @IsInt()
   @IsNotEmpty()
   @ApiProperty({ description: "음식 수량" })
   counts: number;

   @IsInt()
   @ApiProperty({ description: "음식 사진" })
   XYCoordinate: number[];
}

@Exclude()
export class UpdateRecordDto {
   @Expose()
   @IsUUID()
   @IsNotEmpty()
   @ApiProperty({ description: "사용자 id" })
   userId: string;

   @Expose()
   @IsString()
   @ApiProperty({ description: "식단 구분", enum: MealType })
   mealType: number;

   @Expose()
   @IsString()
   @IsOptional()
   @ApiProperty({ description: "이미지", required: false })
   foodImageUrl: string;

   @Expose()
   @IsDate()
   @ApiProperty({ description: "첫 기록일", required: false })
   firstRecordDate: Date;

   @Expose()
   @ValidateNested({ each: true })
   @Type(() => FoodUpdateDto)
   @ApiProperty({ description: "음식 목록", type: [FoodUpdateDto] })
   foods: FoodUpdateDto[];
}