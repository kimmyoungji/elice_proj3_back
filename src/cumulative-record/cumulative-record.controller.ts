import { Controller, Get, Query, Req, Res, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CumulativeRecordService } from "./cumulative-record.service";
import { isLoggedInGuard } from "src/auth/utils/isLoggedin.guard";

@Controller("cumulative-record")
@ApiTags("Cumulative Record API")
export class CumulativeRecordController {
  constructor(private cumulariveRecordService: CumulativeRecordService) {}

  @Get("/")
  // @UseGuards(isLoggedInGuard)
  @ApiOperation({
    summary: "월별/일별 누적 식단 데이터 조회하기",
    description: "유저의 누적 식단 데이터를 조회한다.",
  })
  async getRecord(
    @Req() request: any,
    @Query("date") date: Date,
    @Query("month") month: Date,
    @Res() response: any
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
        const { totalResult, HealthInfoResult } =
          await this.cumulariveRecordService.getDateRecord(date, userId);
        const { totalCalories, ...datas } = totalResult;
        const { targetCalories, recommendIntake } = await HealthInfoResult;
        const { mealTypeResult, mealTypeImage } =
          await this.cumulariveRecordService.getDateMealTypeRecord(
            date,
            userId
          );
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

        response.status(200).json({
          totalCalories,
          targetCalories,
          totalNutrient: datas,
          recommendNutrient,
          dateArr,
        });
      }

      if (month) {
        const data = await this.cumulariveRecordService.getMonthRecord(
          month,
          userId
        );
        const dateArr = data.map((item) => item.date.getDate());
        const caloriesArr = data.map((item) => item.mealTotalCalories);
        response.status(200).json({
          existedDate: dateArr,
          totalCalData: caloriesArr,
        });
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
  async getDateMealTypeRecord(
    @Req() request: any,
    @Query("date") date: Date,
    @Res() response: any
  ) {
    try {
      const userId = "5c97c044-ea91-4e3e-bf76-eae150c317d1";
      // const userId = request.user.userId;
      const { mealTypeResult, mealTypeImage } =
        await this.cumulariveRecordService.getDateMealTypeRecord(date, userId);
      const dateArr = mealTypeResult.map((result, index) => [
        result.mealType,
        result.mealTotalCalories / 100,
        mealTypeImage[index],
      ]);
      const includeArr = mealTypeResult.map((item) => item.mealType);
      for (let i = 1; i <= 4; i++) {
        if (!includeArr.includes(i)) {
          dateArr.push([i, 0, null]);
        }
      }
      const sortedDateArr = dateArr.sort((a, b) => a[0] - b[0]);
      response.status(200).json({ dateArr: sortedDateArr });
    } catch (error) {
      throw error;
    }
  }

  @Get("/month")
  // @UseGuards(isLoggedInGuard)
  @ApiOperation({
    summary: "월별 식사별 누적 식단 데이터 조회하기",
    description: "유저의 월별 아침, 점심, 저녁 누적 식단 데이터를 조회한다.",
  })
  async getMonthDetailRecord(
    @Req() request: any,
    @Query("month") month: Date,
    @Query("page") page: number,
    @Res() response: any
  ) {
    try {
      const userId = "5c97c044-ea91-4e3e-bf76-eae150c317d1"; // 임의로
      // const userId = request.user.userId;
      const { mealData, mealTypeImage } =
        await this.cumulariveRecordService.getMonthDetailRecord(
          month,
          page,
          userId
        );
      const groupedData = new Map<number, any[]>();

      mealData.forEach((item, index) => {
        const dateKey = parseInt(new Date(item.date).getDate().toString());
        if (!groupedData.has(dateKey)) {
          groupedData.set(dateKey, []);
        }
        groupedData
          .get(dateKey)
          .push([
            item.mealType,
            item.mealTotalCalories / 100,
            mealTypeImage[index],
          ]);
      });
      const transformedData = [];
      groupedData.forEach((dateArr, date) => {
        transformedData.push({
          date,
          dateArr,
        });
      });

      response.status(200).json(transformedData);
    } catch (error) {
      throw error;
    }
  }
}
