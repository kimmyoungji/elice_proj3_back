import { Controller, Get, Query } from "@nestjs/common";
import { FoodInfoService } from "./food-info.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller("food-info")
export class FoodInfoController {
  constructor(private foodInfoService: FoodInfoService) {}

  @ApiOperation({ summary: "음식 조회하기" })
  @Get("/foods")
  async getFoodInfo(
    @Query("foodName") foodName: string,
    @Query("keyword") keyword: string
  ) {
    if (foodName) {
      return await this.foodInfoService.getFoodInfo(foodName);
    }
    if (keyword) {
      return await this.foodInfoService.getFoodList(keyword);
    }
  }
}
