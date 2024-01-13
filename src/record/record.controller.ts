import { Controller, Get, Param, Query, Post, Put, Delete, Body, Req } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RecordService } from "./record.service";
import { Record } from "./record.entity";

@Controller("records")
@ApiTags("Record API")
export class RecordController {
  constructor(private recordService: RecordService) {}

  // GET /records?date=2024-01-03
  @Get("?date")
  @ApiOperation({ summary: "특정 날짜의 식단 조회" })
  async getDailyRecords(
    @Query("date") date: Date,
    @Req() req: Request,
  ): Promise<Record[]> {
    const records = await this.recordService.getDailyRecord(date);
    return records;
  }

  // POST /records
  @Post()
  @ApiOperation({ summary: "식단 기록" })
  async createRecord(
    @Body() record: Record,
    @Req() req: Request,
  ): Promise<Record> {
    const savedRecord = await this.recordService.createRecord(record);
    return savedRecord;
  }

  // PUT /records
  // @Put()
  // @ApiOperation({ summary: "식단 수정" })
  // async updateRecord(
  //   @Body() record: Record,
  //   @Req() req: Request,
  // ): Promise<Record> {
  //   const updatedRecord = await this.recordService.updateRecord(record);
  //   return updatedRecord;
  // }

  // DELETE /records
  // @Delete()
  // @ApiOperation({ summary: "식단 삭제" })
  // async deleteRecord(
  //   @Body() record: Record,
  //   @Req() req: Request,
  // ): Promise<void> {
  //   await this.recordService.deleteRecord(record);
  // }
}
