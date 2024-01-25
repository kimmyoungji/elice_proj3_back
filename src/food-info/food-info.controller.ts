import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { FoodInfoService } from "./food-info.service";
import { ApiOperation } from "@nestjs/swagger";
import { isLoggedInGuard } from "src/auth/utils/isLoggedin.guard";

@Controller("food-info")
export class FoodInfoController {
  constructor(private foodInfoService: FoodInfoService) {}

  @ApiOperation({ summary: "음식 조회하기" })
  @Get("/foods")
  // @UseGuards(isLoggedInGuard)
  async getFoodInfo(
    @Query("keyword") keyword: string,
    @Query("foodName") foodName: string,
    @Query("foodInfoId") foodInfoId: string
  ) {
    if (keyword) {
      return await this.foodInfoService.getFoodList(keyword);
    }
    // 리스트에 없던 경우
    if (foodName) {
      return await this.foodInfoService.getFoodInfo(foodName);
    }
    // 리스트에 있는 경우
    if (foodInfoId) {
      return await this.foodInfoService.getFoodInfoById(foodInfoId);
    }
  }
}
