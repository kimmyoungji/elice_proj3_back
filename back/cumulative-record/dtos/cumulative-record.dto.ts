import { IsInt, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class CumulativeRecordDateDto {
  @Expose()
  @ApiProperty({ description: "식사별 섭취한 총 칼로리" })
  @IsNotEmpty()
  @IsInt()
  meal_total_calories: number;

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
  dietary_fiber: number;
}

@Exclude()
export class CumulativeRecordMonthDto {
  @Expose()
  @ApiProperty({ description: "날짜" })
  @IsNotEmpty()
  date: Date;

  @Expose()
  @ApiProperty({ description: "하루 섭취한 총 칼로리" })
  @IsNotEmpty()
  @IsInt()
  meal_total_calories: number;
}
