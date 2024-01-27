import { Controller, Get, Param, Query, Post, Put, Delete, Body, Req, HttpStatus, Res, UsePipes } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RecordService } from "./record.service";
import { Record } from "./record.entity";
import { CreateRecordDto } from "./dtos/createRecord.dto";
import { ValidateFoodPipe } from "./pipes/record.pipe";
import { UpdateRecordDto } from "./dtos/updateRecord.dto";

@Controller("records")
@ApiTags("Record API")
export class RecordController {
  constructor(private recordService: RecordService) {}

  // GET /records?date=yyyy-mm-dd
  @Get()
  @ApiOperation({ summary: "특정 날짜의 식단 조회" })
  async getDailyRecords(
    @Query("userId") userId: string,
    @Query("date") date: string
  ): Promise<Record[]> {
    const records = await this.recordService.getDailyRecord(userId, date);
    return records;
  }

  // POST /records
  @Post()
  @UsePipes(new ValidateFoodPipe())
  @ApiOperation({ summary: "식단 기록" })
  async createRecord(
    @Body() createRecordDto: CreateRecordDto
  ): Promise<string> {
    await this.recordService.createRecord(createRecordDto);
    return "식단 기록 성공";
  }


  // PUT /records?date=yyyy-mm-dd&mealType
  @Put()
  @ApiOperation({ summary: "특정 날짜와 식단 구분 수정" })
  async updateDailyRecord(
    @Query('date') date: string,
    @Query('mealType') queryMealType: number,
    @Body() recordId: string,
    @Body() updateRecordDto: UpdateRecordDto,
  ): Promise<string> {
    await this.recordService.updateDailyRecord(date, queryMealType, updateRecordDto);
    return "식단 수정 성공";
  }

  // DELETE /records?date=yyyy-mm-dd&mealType
  @Delete()
  @ApiOperation({ summary: "특정 날짜와 식단 구분 삭제" })
  async deleteDailyRecord(
    @Query('date') date: string,
    @Query('mealType') mealType: number,
  ): Promise<string> {
    await this.recordService.deleteDailyRecord(date, mealType);
    return "식단 삭제 성공"
  }
}