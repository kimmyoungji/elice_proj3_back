import { Controller, Get, Param, Query, Post, Put, Delete, Body, Req, HttpStatus, Res } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RecordService } from "./record.service";
import { Record } from "./record.entity";
import { response } from "express";

@Controller("records")
@ApiTags("Record API")
export class RecordController {
  constructor(private recordService: RecordService) {}

  // GET /records?date=yyyy-mm-dd&mealType=
  @Get()
  @ApiOperation({ summary: "특정 날짜의 식단 조회" })
  async getDailyRecords(
    @Query("date") date: string,      
    @Query('mealType') mealType: string,
  ): Promise<Record[]> {
    const records = await this.recordService.getDailyRecord(date, mealType);
    return records;
  }

  // POST /records
  @Post()
  @ApiOperation({ summary: "식단 기록" })
  async createRecord(
    @Body() record: Record
  ): Promise<string> {
    await this.recordService.createRecord(record);
    return "식단 기록 성공";
  }


  // PUT /records?date=yyyy-mm-dd&mealType
  @Put()
  @ApiOperation({ summary: "특정 날짜와 식단 구분 수정" })
  async updateDailyRecord(
    @Query('date') date: string,
    @Query('mealType') mealType: string,
    @Body() updateData: Partial<Record>,
  ): Promise<string> {
    await this.recordService.updateDailyRecord(date, mealType, updateData);
    return "식단 수정 성공";
  }

  // DELETE /records?date=yyyy-mm-dd&mealType
  @Delete()
  @ApiOperation({ summary: "특정 날짜와 식단 구분 삭제" })
  async deleteDailyRecord(
    @Query('date') date: string,
    @Query('mealType') mealType: string,
  ): Promise<String> {
    await this.recordService.deleteDailyRecord(date, mealType);
    return "식단 삭제 성공"
  }
}