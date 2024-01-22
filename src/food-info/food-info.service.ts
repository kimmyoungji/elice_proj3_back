import { Injectable } from "@nestjs/common";
import { FoodInfoRepository } from "./food-info.repository";
import { FoodInfoDto } from "./dtos/food-info.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FoodInfoService {
  constructor(private foodInfoRepository: FoodInfoRepository) {}

  async getFoodList(keyword: string) {
    const result = await this.foodInfoRepository.getFoodList(keyword);
    const resultArr = result.map((value) => value.foodName);
    return resultArr;
  }

  async getFoodInfo(foodName: string): Promise<FoodInfoDto> {
    const result = await this.foodInfoRepository.getFoodInfo(foodName);
    return plainToInstance(FoodInfoDto, result);
  }
}
