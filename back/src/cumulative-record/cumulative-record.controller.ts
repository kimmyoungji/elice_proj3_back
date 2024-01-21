import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CumulativeRecordService } from "./cumulative-record.service";
import { CumulativeRecord } from "./cumulative-record.entity";
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
  //   @Get()
  //   addData(): Promise<CumulativeRecord> {
  //     return this.cumulariveRecordService.addData();
  //   }

  @Get("/date")
  @ApiOperation({
    summary: "일별 식단 누적 데이터 조회하기",
    description: "유저의 일별 식단 누적 데이터를 조회한다.",
  })
  getDateRecord(@Query("date") date: Date): Promise<CumulativeRecord[]> {
    // JWT토큰으로 유저 id 확인하기
    // const user = this.userService.getUserId(); // 추후 user api 보고 수정 필요
    const userId = "01"; // 임의로
    return this.cumulariveRecordService.getDateRecord(date, userId);
  }

  @Get("/month")
  @ApiOperation({
    summary: "월별 식단 누적 데이터 조회하기",
    description: "유저의 월별 식단 누적 데이터를 조회한다.",
  })
  getMonthRecord(@Query("month") date: Date): Promise<CumulativeRecord[]> {
    // JWT토큰으로 유저 id 확인하기
    // const user = this.userService.getUserId(); // 추후 user api 보고 수정 필요
    const userId = "02"; // 임의로
    return this.cumulariveRecordService.getMonthRecord(date, userId);
  }

  // User module 합칠 때
  // @Get("/date")
  // @ApiOperation({
  //   summary: "일별 식단 누적 데이터 조회하기",
  //   description: "유저의 일별 식단 누적 데이터를 조회한다.",
  // })
  // getDateRecord(@Query("date") date: Date): Promise<CumulativeRecord[]> {
  //   // JWT토큰으로 유저 id 확인하기
  //   const user = this.userService.getUserId(); // user api 보고 수정 필요
  //   return this.cumulariveRecordService.getDateRecord(date, user);
  // }

  // @Get("/month")
  // @ApiOperation({
  //   summary: "월별 식단 누적 데이터 조회하기",
  //   description: "유저의 월별 식단 누적 데이터를 조회한다.",
  // })
  // getMonthRecord(@Query("month") date: Date): Promise<CumulativeRecord[]> {
  //   // JWT토큰으로 유저 id 확인하기
  //   const user = this.userService.getUserId(); // user api 보고 수정 필요
  //   return this.cumulariveRecordService.getMonthRecord(date, user);
  // }
}
