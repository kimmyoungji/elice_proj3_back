import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { FoodInfoService } from "./food-info.service";
import { ApiOperation } from "@nestjs/swagger";
import { FoodInfoDto } from "./dtos/food-info.dto";

@Controller("food-info")
export class FoodInfoController {
  constructor(private foodInfoService: FoodInfoService) {}

  @ApiOperation({ summary: "키워드로 음식 조회하기" })
  @Post("/foods")
  async getFoodList(@Body("keyword") keyword: string) {
    return await this.foodInfoService.getFoodList(keyword);
  }

  @ApiOperation({ summary: "음식 영양성분 조회하기" })
  @Get("/foods")
  async getFoodInfo(@Query("foodName") foodName: string): Promise<FoodInfoDto> {
    return await this.foodInfoService.getFoodInfo(foodName);
  }
}
