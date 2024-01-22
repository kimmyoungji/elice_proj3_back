import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CumulativeRecordService } from "./cumulative-record.service";
// import { UserService } from "src/user/user.service";
// import { User } from "src/user/user.entity";

@Controller("cumulative-record")
@ApiTags("Cumulative Record API")
export class CumulativeRecordController {
  constructor(
    private cumulariveRecordService: CumulativeRecordService
    // private userService: UserService
  ) {}

  // 데이터 추가 api - test용
  @Get()
  addData() {
    return this.cumulariveRecordService.addData();
  }

  @Get("/")
  @ApiOperation({
    summary: "월별/일별 누적 식단 데이터 조회하기",
    description: "유저의 누적 식단 데이터를 조회한다.",
  })
  async getRecord(@Query("date") date: Date, @Query("month") month: Date) {
    // JWT토큰으로 유저 id 확인하기
    // const user = this.userService.getUserId(); // 추후 user api 보고 수정 필요
    const userId = "02"; // 임의로
    if (date) {
      const data = await this.cumulariveRecordService.getDateRecord(
        date,
        userId
      );
      const { daily_total_calories, ...datas } = data[0];
      const result = {
        totalCalories: daily_total_calories,
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
        calories_arr.push(data[i].daily_total_calories);
      }
      console.log(date_arr, calories_arr);
      const result = {
        existedDate: date_arr,
        totalCalData: calories_arr,
      };
      return result;
    }
  }

  // 아직 구현중
  @Get("/month")
  @ApiOperation({
    summary: "월별 식사별 누적 식단 데이터 조회하기",
    description: "유저의 월별 아침, 점심, 저녁 누적 식단 데이터를 조회한다.",
  })
  async getMonthDetailRecord(@Query("page") page: Number) {
    console.log("page", page);
    // JWT토큰으로 유저 id 확인하기
    // const user = this.userService.getUserId(); // 추후 user api 보고 수정 필요
    const userId = "02"; // 임의로
    const result = await this.cumulariveRecordService.getMonthDetailRecord(
      page,
      userId
    );

    return result;
  }
}
