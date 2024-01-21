import { Injectable } from "@nestjs/common";
import { CumulativeRecord } from "./cumulative-record.entity";
import { CumulativeRecordRepository } from "./cumulative.repository";
// import { User } from "src/user/user.entity";

@Injectable()
export class CumulativeRecordService {
  constructor(private cumulativeRepository: CumulativeRecordRepository) {}

  // 데이터 추가 api - test용
  //   async addData(): Promise<CumulativeRecord> {
  //     return this.cumulativeRepository.addData();
  //   }

  async getDateRecord(date: Date, userId: string): Promise<CumulativeRecord[]> {
    return this.cumulativeRepository.getDateRecord(date, userId);
  }

  async getMonthRecord(
    date: Date,
    userId: string
  ): Promise<CumulativeRecord[]> {
    return this.cumulativeRepository.getMonthRecord(date, userId);
  }

  // User module 합칠 때
  // async getDateRecord(date: Date, user: User): Promise<CumulativeRecord[]> {
  //   return this.cumulativeRepository.getDateRecord(date, user);
  // }

  // async getMonthRecord(date: Date, user: User): Promise<CumulativeRecord[]> {
  //   return this.cumulativeRepository.getMonthRecord(date, user);
  // }
}
