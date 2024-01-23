import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CumulativeRecordService } from "./cumulative-record.service";

@Controller("cumulative-record")
@ApiTags("Cumulative Record API")
export class CumulativeRecordController {
  constructor(private cumulariveRecordService: CumulativeRecordService) {}

  @Get("/")
  @ApiOperation({
    summary: "월별/일별 누적 식단 데이터 조회하기",
    description: "유저의 누적 식단 데이터를 조회한다.",
  })
  async getRecord(@Query("date") date: Date, @Query("month") month: Date) {
    // JWT토큰으로 유저 id 확인하기
    const userId = "90936edf-2aab-4cbe-b06f-0d4f0bf5da23";
    if (date) {
      const data = await this.cumulariveRecordService.getDateRecord(
        date,
        userId
      );
      // return 값 다시 확인 필요
      const { mealTotalCalories, ...datas } = data[0];
      const result = {
        totalCalories: mealTotalCalories,
        totalNutrient: datas,
      };
      return result;
    }

    if (month) {
      const data = await this.cumulariveRecordService.getMonthRecord(
        month,
        userId
      );
      const count = Object.keys(data).length;
      const date_arr = [];
      const calories_arr = [];
      for (let i = 0; i < count; i++) {
        date_arr.push(data[i].date.getDate());
        calories_arr.push(data[i].dailyTotalCalories);
      }
      const result = {
        existedDate: date_arr,
        totalCalData: calories_arr,
      };
      return result;
    }
  }

  @Get("/meal")
  @ApiOperation({
    summary: "일별/meal 타입별 누적 식단 데이터 조회하기",
    description: "유저의 누적 식단 데이터를 조회한다.",
  })
  async getDateMealTypeRecord(@Query("date") date: Date) {
    // JWT토큰으로 유저 id 확인하기
    const userId = "90936edf-2aab-4cbe-b06f-0d4f0bf5da23";
    const result = await this.cumulariveRecordService.getDateMealTypeRecord(
      date,
      userId
    );
    return result;
  }

  @Get("/month")
  @ApiOperation({
    summary: "월별 식사별 누적 식단 데이터 조회하기",
    description: "유저의 월별 아침, 점심, 저녁 누적 식단 데이터를 조회한다.",
  })
  async getMonthDetailRecord(@Query("page") page: Number) {
    // JWT토큰으로 유저 id 확인하기
    const userId = "90936edf-2aab-4cbe-b06f-0d4f0bf5da23"; // 임의로
    const result = await this.cumulariveRecordService.getMonthDetailRecord(
      page,
      userId
    );

    return result;
  }
}
