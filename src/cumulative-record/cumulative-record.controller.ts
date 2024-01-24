import { Controller, Get, Param, Query, Req, UseGuards } from "@nestjs/common";
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
    @Query("month") month: Date
  ) {
    const userId = "5c97c044-ea91-4e3e-bf76-eae150c317d1";
    // const userId = request.user.userId;
    if (date) {
      const data = await this.cumulariveRecordService.getDateRecord(
        date,
        userId
      );
      // return 값 다시 확인 필요
      const { totalCalories, ...datas } = data[0];
      const result = {
        totalCalories: totalCalories,
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
        calories_arr.push(data[i].totalCalories);
      }
      const result = {
        existedDate: date_arr,
        totalCalData: calories_arr,
      };
      return result;
    }
  }

  @Get("/meal")
  // @UseGuards(isLoggedInGuard)
  @ApiOperation({
    summary: "일별/meal 타입별 누적 식단 데이터 조회하기",
    description: "유저의 누적 식단 데이터를 조회한다.",
  })
  async getDateMealTypeRecord(@Req() request: any, @Query("date") date: Date) {
    const userId = "5c97c044-ea91-4e3e-bf76-eae150c317d1";
    // const userId = request.user.userId;
    const result = await this.cumulariveRecordService.getDateMealTypeRecord(
      date,
      userId
    );
    return result;
  }

  @Get("/month")
  // @UseGuards(isLoggedInGuard)
  @ApiOperation({
    summary: "월별 식사별 누적 식단 데이터 조회하기",
    description: "유저의 월별 아침, 점심, 저녁 누적 식단 데이터를 조회한다.",
  })
  async getMonthDetailRecord(@Req() request: any, @Query("page") page: Number) {
    const userId = "5c97c044-ea91-4e3e-bf76-eae150c317d1"; // 임의로
    // const userId = request.user.userId;
    const result = await this.cumulariveRecordService.getMonthDetailRecord(
      page,
      userId
    );

    return result;
  }
}
