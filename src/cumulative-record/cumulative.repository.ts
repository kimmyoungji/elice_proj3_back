import { DataSource, Repository } from "typeorm";
import { CumulativeRecord } from "./cumulative-record.entity";
import { InjectRepository } from "@nestjs/typeorm";
// import { User } from "src/user/user.entity";
import { Injectable } from "@nestjs/common";
import {
  CumulativeRecordDateDto,
  CumulativeRecordMonthDto,
} from "./dtos/cumulative-record.dto";

@Injectable()
export class CumulativeRecordRepository extends Repository<CumulativeRecord> {
  constructor(
    @InjectRepository(CumulativeRecord)
    private cumulativeRecordRepository: Repository<CumulativeRecord>
  ) {
    super(
      cumulativeRecordRepository.target,
      cumulativeRecordRepository.manager,
      cumulativeRecordRepository.queryRunner
    );
  }
  // constructor(
  //   @InjectRepository(CumulativeRecord) private dataSource: DataSource
  // ) {
  //   super(CumulativeRecord, dataSource.manager);
  // }

  // 데이터 추가 api - test용
  // async addData(): Promise<CumulativeRecord> {
  //   const data = this.create({
  //     record_ids: ["A01", "A02"],
  //     user_id: "02",
  //     meal_type: "점심",
  //     meal_total_calories: 800,
  //     date: new Date("2024-01-09"),
  //   });
  //   await this.save(data);
  //   return data;
  // }

  // 일별 데이터 - totalCalories, totalNutrient
  async getDateRecord(
    date: Date,
    userId: string
  ): Promise<CumulativeRecordDateDto[]> {
    const cumulativeResult = await this.createQueryBuilder("entity")
      .select([
        "entity.userId",
        "entity.date",
        "SUM(entity.mealTotalCalories)",
        "SUM(entity.carbohydrates)",
        "SUM(entity.proteins)",
        "SUM(entity.fats)",
        "SUM(entity.dietaryFiber)",
      ])
      .where("DATE_TRUNC('day', entity.date) = :date", { date })
      .andWhere("entity.user_id = :userId", { userId })
      .groupBy("entity.user_id, entity.date") // 순서에 따른 조회 속도
      .getMany();
    return cumulativeResult;
  }

  // 일별/타입별 데이터 - mealType, calories, imgURL
  async getDateMealTypeRecord(date: Date, userId: string) {
    const result = await this.createQueryBuilder("entity")
      .where("DATE_TRUNC('day', entity.date) = :date", { date })
      .andWhere("entity.user_id = :userId", { userId })
      .getMany();
    return result;
    // record_id로 img 테이블과 조인
    // 날짜를 먼저 조회하는 것 vs 유저 id를 먼저 조회하는 것 -> 무엇이 더 빠를까?
  }

  async getMonthRecord(
    month: Date,
    userId: string
  ): Promise<CumulativeRecord[]> {
    const result = await this.createQueryBuilder("entity")
      .where("entity.user_id = :userId", { userId })
      .andWhere("DATE_TRUNC('month', entity.date) = :month", { month })
      .getMany();
    return result;
  }

  async getMonthDetailRecord(page: Number, userId: string) {
    const recordIds = ["3", "5"]; // record-table에서 가져옴
    const result = await this.createQueryBuilder("entity")
      .where("entity.user_id = :userId", { userId })
      .andWhere("entity.record_ids IN :recordIds", { recordIds })
      .getMany();
    return result;
  }
}
