import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { FoodInfoService } from "./food-info.service";

@Controller("food-info")
export class FoodInfoController {
  constructor(private foodInfoService: FoodInfoService) {}

  @Post("/foods")
  getFoodList(@Body("keyword") keyword: string) {
    this.foodInfoService.getFoodList(keyword);
  }

  @Get("/foods")
  getFoodInfo(@Query("foodName") foodName: string) {
    this.foodInfoService.getFoodInfo(foodName);
  }
}
