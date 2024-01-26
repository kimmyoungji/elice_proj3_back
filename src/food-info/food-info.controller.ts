import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { FoodInfoService } from "./food-info.service";
import { ApiOperation } from "@nestjs/swagger";
import { isLoggedInGuard } from "src/auth/utils/isLoggedin.guard";
import { FoodNamePipe } from "./pipe/food-name.pipe";

@Controller("food-info")
export class FoodInfoController {
  constructor(private foodInfoService: FoodInfoService) {}

  @ApiOperation({ summary: "음식 조회하기" })
  @Get("/foods")
  // @UseGuards(isLoggedInGuard)
  async getFoodInfo(
    @Query("keyword") keyword: string,
    @Query("lastFoodId") lastFoodId: string,
    @Query("foodName", FoodNamePipe) foodName: string,
    @Query("foodInfoId") foodInfoId: string
  ) {
    console.log("foodName", foodName);
    if (keyword) {
      if (!lastFoodId) {
        return await this.foodInfoService.getFoodList(keyword);
      } else {
        return await this.foodInfoService.getFoodNextList(keyword, lastFoodId);
      }
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
