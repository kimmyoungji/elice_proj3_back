import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CumulativeRecordService } from "./cumulative-record.service";
import { isLoggedInGuard } from "src/auth/utils/isLoggedin.guard";
import { Health } from "aws-sdk";

@Controller("cumulative-record")
@ApiTags("Cumulative Record API")
export class CumulativeRecordController {
  constructor(private cumulativeRecordService: CumulativeRecordService) {}

  @Get("/")
  // @UseGuards(isLoggedInGuard)
  @ApiOperation({
    summary: "월별/일별 누적 식단 데이터 조회하기",
    description: "유저의 누적 식단 데이터를 조회한다.",
  })
  async getRecord(
    @Req() request: any,
    @Query("date") date: Date,
    @Query("month") month: Date
  ) {
    try {
      const userId = "5c97c044-ea91-4e3e-bf76-eae150c317d1";
      // const userId = request.user.userId;

      // 1) [Cumulative Table] 유저의 일별 모든 meal type의 칼로리 합산 -> totalCalories
      // 2) [Cumulative Table] 유저의 일별 모든 meal type의 탄단지 합산 -> totalNutrient
      // 3) [HealthInfo Table] 유저의 목표 칼로리 조회 -> targetCalories
      // 4) [HealthInfo Table] 유저의 목표 영양성분 조회 -> recommendNutrient
      // 5) [Cumulative Table & Image Table] meal type별 칼로리와 image -> dateArr
      if (date) {
        const { totalResultDto, HealthInfoResult } =
          await this.cumulativeRecordService.getDateRecord(date, userId);
        if (!totalResultDto || !HealthInfoResult) {
          throw new NotFoundException("데이터가 존재하지 않습니다");
        }
        const { totalCalories, ...datas } = totalResultDto;
        const { targetCalories, recommendIntake } = await HealthInfoResult;
        const { mealTypeResult, mealTypeImage } =
          await this.cumulativeRecordService.getDateMealTypeRecord(
            date,
            userId
          );
        if (mealTypeResult.length === 0 || mealTypeImage.length === 0) {
          return [];
        }
        const recommendNutrient = {
          carbohydrates: recommendIntake[0],
          proteins: recommendIntake[1],
          fats: recommendIntake[2],
          dietaryFiber: recommendIntake[3],
        };
        const dateArr = mealTypeResult.map((result, index) => [
          result.mealType,
          result.mealTotalCalories / 100,
          mealTypeImage[index],
        ]);

        return {
          totalCalories,
          targetCalories,
          totalNutrient: datas,
          recommendNutrient,
          dateArr,
        };
      }

      if (month) {
        const data = await this.cumulativeRecordService.getMonthRecord(
          month,
          userId
        );
        if (data.length === 0) {
          return [];
        }
        const dateArr = data.map((item) => item.date.getDate());
        const caloriesArr = data.map((item) => item.mealTotalCalories);

        return {
          existedDate: dateArr,
          totalCalData: caloriesArr,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  @Get("/meal")
  // @UseGuards(isLoggedInGuard)
  @ApiOperation({
    summary: "일별/meal 타입별 누적 식단 데이터 조회하기",
    description: "유저의 누적 식단 데이터를 조회한다.",
  })
  async getDateMealTypeRecord(@Req() request: any, @Query("date") date: Date) {
    try {
      const userId = "5c97c044-ea91-4e3e-bf76-eae150c317d1";
      // const userId = request.user.userId;
      const sortedDateArr =
        await this.cumulativeRecordService.transformMealTypeRecord(
          date,
          userId
        );
      return { dateArr: sortedDateArr };
    } catch (error) {
      throw error;
    }
  }
  // @Delete("/meal")
  // @ApiOperation({})
  @Get("/month")
  // @UseGuards(isLoggedInGuard)
  @ApiOperation({
    summary: "월별 식사별 누적 식단 데이터 조회하기",
    description: "유저의 월별 아침, 점심, 저녁 누적 식단 데이터를 조회한다.",
  })
  async getMonthDetailRecord(
    @Req() request: any,
    @Query("month") month: Date,
    @Query("page") page: number
  ) {
    try {
      const userId = "5c97c044-ea91-4e3e-bf76-eae150c317d1"; // 임의로
      // const userId = request.user.userId;
      const transformedData =
        await this.cumulativeRecordService.getMonthDetailRecord(
          month,
          page,
          userId
        );
      if (transformedData.length === 0) {
        return [];
      }
      return transformedData;
    } catch (error) {
      throw error;
    }
  }
}
