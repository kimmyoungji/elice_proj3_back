import { Injectable } from "@nestjs/common";
import { CumulativeRecordRepository } from "./cumulative.repository";
import {
  CumulativeRecordDateDto,
  CumulativeRecordMonthDto,
} from "./dtos/cumulative-record.dto";
import { plainToInstance } from "class-transformer";
// import { User } from "src/user/user.entity";

@Injectable()
export class CumulativeRecordService {
  constructor(private cumulativeRepository: CumulativeRecordRepository) {}

  // 데이터 추가 api - test용
  async addData() {
    return this.cumulativeRepository.addData();
  }

  async getDateRecord(
    date: Date,
    userId: string
  ): Promise<CumulativeRecordDateDto> {
    const result = this.cumulativeRepository.getDateRecord(date, userId);
    return plainToInstance(CumulativeRecordDateDto, result);
  }

  async getMonthRecord(
    month: Date,
    userId: string
  ): Promise<CumulativeRecordMonthDto> {
    const result = this.cumulativeRepository.getMonthRecord(month, userId);
    return plainToInstance(CumulativeRecordMonthDto, result);
  }

  async getMonthDetailRecord(page: Number, userId: string) {
    const result = this.cumulativeRepository.getMonthDetailRecord(page, userId);
    return result;
  }
}
