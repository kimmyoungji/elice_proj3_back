import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { FoodInfoService } from "./food-info.service";
import { ApiOperation } from "@nestjs/swagger";
import { isLoggedInGuard } from "src/auth/utils/guards/isLoggedin.guard";
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
    try {
      if (keyword) {
        if (!lastFoodId) {
          const foodListResult =
            await this.foodInfoService.getFoodList(keyword);
          if (foodListResult.length === 0) {
            throw new NotFoundException("데이터가 존재하지 않습니다");
          }
          return foodListResult;
        } else {
          const foodNextListResult = await this.foodInfoService.getFoodNextList(
            keyword,
            lastFoodId
          );
          if (foodNextListResult.length === 0) {
            throw new NotFoundException("데이터가 존재하지 않습니다");
          }
          return foodNextListResult;
        }
      }
      // 리스트에 없던 경우
      if (foodName) {
        const foodInfoResult = await this.foodInfoService.getFoodInfo(foodName);
        if (!foodInfoResult) {
          throw new NotFoundException("데이터가 존재하지 않습니다");
        }
        return foodInfoResult;
      }
      // 리스트에 있는 경우
      if (foodInfoId) {
        const foodInfoResult =
          await this.foodInfoService.getFoodInfoById(foodInfoId);
        if (!foodInfoResult) {
          throw new NotFoundException("데이터가 존재하지 않습니다");
        }
        return foodInfoResult;
      }
    } catch (error) {
      return error;
    }
  }

  @ApiOperation({ summary: "음식들의 foodInfoId 조회하기" })
  @Post("/foods")
  // @UseGuards(isLoggedInGuard)
  async getFoodList(@Body("foodList", FoodNamePipe) foodList: string[]) {
    try {
      const foodIdListResult =
        await this.foodInfoService.getFoodIdList(foodList);
      return { foodIdListResult: foodIdListResult };
    } catch (error) {
      return error;
    }
  }
}
