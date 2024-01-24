import { IsInt, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class CumulativeRecordDateDto {
  @Expose()
  @ApiProperty({ description: "식사별 섭취한 총 칼로리" })
  @IsNotEmpty()
  @IsInt()
  totalCalories: number;

  @Expose()
  @ApiProperty({ description: "식사별 섭취한 탄수화물" })
  @IsNotEmpty()
  @IsInt()
  carbohydrates: number;

  @Expose()
  @ApiProperty({ description: "식사별 섭취한 단백질" })
  @IsNotEmpty()
  @IsInt()
  proteins: number;

  @Expose()
  @ApiProperty({ description: "식사별 섭취한 지방" })
  @IsNotEmpty()
  @IsInt()
  fats: number;

  @Expose()
  @ApiProperty({ description: "식사별 섭취한 식이섬유" })
  @IsNotEmpty()
  @IsInt()
  dietaryFiber: number;
}

@Exclude()
export class CumulativeDateMealTypeDto {
  @Expose()
  @ApiProperty({ description: "날짜" })
  @IsNotEmpty()
  date: Date;

  @Expose()
  @ApiProperty({ description: "식사 종류" })
  @IsNotEmpty()
  mealType: string;

  @Expose()
  @ApiProperty({ description: "하루 섭취한 총 칼로리" })
  @IsNotEmpty()
  @IsInt()
  mealTotalCalories: number;
}
