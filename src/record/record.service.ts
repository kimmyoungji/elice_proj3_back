import { Injectable, NotFoundException } from "@nestjs/common";
import { Record } from "./record.entity";
import { RecordRepository } from "./record.repository";

@Injectable()
export class RecordService {
  constructor(private recordRepository: RecordRepository) {}

  // 특정 날짜의 식단을 조회하는 메서드
  async getDailyRecord(date: Date): Promise<Record[]> {
    const records = await this.recordRepository.findByDate(date);
    if (records.length === 0) {
      throw new NotFoundException("해당 날짜의 식단이 없습니다.");
    }
    return records;
  }

  // 식단을 기록하는 메서드
  async createRecord(record: Record): Promise<Record> {
    const savedRecord = await this.recordRepository.createRecord(record);
    return savedRecord;
  }

  // 특정 날짜의 식단을 수정하는 메서드
  async updateDailyRecord(date: string, mealType: string, updateData: Partial<Record>): Promise<Record> {
    return await this.recordRepository.updateRecord(date, mealType, updateData);
  }

  // 특정 날짜의 식단을 삭제하는 메서드
  async deleteDailyRecord(date: string, mealType: string): Promise<void> {
    await this.recordRepository.deleteRecord(date, mealType);
  }
}
