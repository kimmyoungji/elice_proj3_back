import { Exclude, Expose } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

@Exclude()
export class FoodInfoDto {
  @Expose()
  @IsNotEmpty()
  foodName: string;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  totalCapacity: number;

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
  dietaryFiber: number;
}
