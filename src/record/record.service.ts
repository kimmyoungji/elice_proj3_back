import { Injectable, NotFoundException } from "@nestjs/common";
import { Record } from "./record.entity";
import { RecordRepository } from "./record.repository";
import { CreateRecordDto } from "./dtos/createRecord.dto";
import { UpdateRecordDto } from "./dtos/updateRecord.dto";

@Injectable()
export class RecordService {
  constructor(private recordRepository: RecordRepository) {}

  // 특정 날짜의 식단을 조회하는 메서드
  async getDailyRecord(date: string): Promise<Record[]> {
    const records = await this.recordRepository.findByDate(date);
    if (records.length === 0) {
      throw new NotFoundException("해당 날짜의 식단이 없습니다.");
    }
    return records;
  }

  // 식단을 기록하는 메서드
  async createRecord(createRecordDto: CreateRecordDto): Promise<Record[]> {
    const savedRecord = await this.recordRepository.createRecord(createRecordDto);
    return savedRecord;
  }

  // 특정 날짜의 식단을 수정하는 메서드
  async updateDailyRecord(date: string, queryMealType: number, updateRecordDto: UpdateRecordDto): Promise<Record[]> {
    return await this.recordRepository.updateRecord(date, queryMealType, updateRecordDto);
  }

  // 특정 날짜의 식단을 삭제하는 메서드
  async deleteDailyRecord(date: string, mealType: number): Promise<void> {
    await this.recordRepository.deleteRecord(date, mealType);
  }
}
