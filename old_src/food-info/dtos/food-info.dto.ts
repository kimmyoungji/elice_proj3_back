import { Exclude, Expose } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

@Exclude()
export class FoodInfoDto {
  @Expose()
  @IsNotEmpty()
  food_name: string;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  total_capacity: number;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  calories: number;

  @Expose()
  @IsInt()
  carbohydrates: number;

  @Expose()
  @IsInt()
  proteins: number;

  @Expose()
  @IsInt()
  fats: number;

  @Expose()
  @IsInt()
  dietary_fiber: number;
}
