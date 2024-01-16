import { Controller, Get, Param, Query, Post, Put, Delete, Body, Req } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RecordService } from "./record.service";
import { Record } from "./record.entity";

@Controller("records")
@ApiTags("Record API")
export class RecordController {
  constructor(private recordService: RecordService) {}

  // GET /records
  @Get()
  @ApiOperation({ summary: "특정 날짜의 식단 조회" })
  async getDailyRecords(
    @Query("date") date: Date,  
  ): Promise<Record[]> {
    const records = await this.recordService.getDailyRecord(date);
    return records;
  }

  // POST /records
  @Post()
  @ApiOperation({ summary: "식단 기록" })
  async createRecord(
    @Body() record: Record,
  ): Promise<Record> {
    const savedRecord = await this.recordService.createRecord(record);
    return savedRecord;
  }

  // PUT /records/:date
  @Put()
  @ApiOperation({ summary: "특정 날짜와 식단 구분의 식단 수정" })
  async updateDailyRecord(
    @Query('date') date: string,
    @Query('mealType') mealType: string,
    @Body() updateData: Partial<Record>,
  ): Promise<Record> {
    return await this.recordService.updateDailyRecord(date, mealType, updateData);
  }

  // DELETE /records/:date
  @Delete(':date')
  @ApiOperation({ summary: "특정 날짜와 식단 구분의 식단 삭제" })
  async deleteDailyRecord(
    @Query('date') date: string,
    @Query('mealType') mealType: string
  ): Promise<void> {
    await this.recordService.deleteDailyRecord(date, mealType);
  }
}