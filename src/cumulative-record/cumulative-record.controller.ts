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
      if (date) {
        const totalData = await this.cumulariveRecordService.getDateRecord(
          date,
          userId
        );
        const { totalCalories, ...datas } = totalData.totalResult[0];
        const { mealTypeResult, mealTypeImage } =
          await this.cumulariveRecordService.getDateMealTypeRecord(
            date,
            userId
          );
        const dateArr = mealTypeResult.map((result, index) => [
          result.mealType,
          result.mealTotalCalories,
          mealTypeImage[index],
        ]);

        response.status(200).json({
          totalCalories: totalCalories,
          totalNutrient: datas,
          dateArr: dateArr,
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
        result.mealTotalCalories,
        mealTypeImage[index],
      ]);

      response.status(200).json({ dateArr: dateArr });
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
    @Query("page") page: Number,
    @Res() response: any
  ) {
    try {
      const userId = "5c97c044-ea91-4e3e-bf76-eae150c317d1"; // 임의로
      // const userId = request.user.userId;
      const mealData = await this.cumulariveRecordService.getMonthDetailRecord(
        month,
        page,
        userId
      );
      console.log("mealData", mealData);

      const groupedData = new Map<string, any[]>();

      mealData.forEach((item) => {
        const dateKey = new Date(item.date).getDate().toString();
        if (!groupedData.has(dateKey)) {
          groupedData.set(dateKey, []);
        }
        groupedData.get(dateKey).push([item.mealType, item.mealTotalCalories]);
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
