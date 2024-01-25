import { EntityManager, Repository } from "typeorm";
import { CumulativeRecord } from "./cumulative-record.entity";
// import { User } from "src/user/user.entity";
import { Injectable } from "@nestjs/common";
import {
  CumulativeDateMealTypeDto,
  CumulativeRecordDateDto,
  // CumulativeRecordMonthDto,
} from "./dtos/cumulative-record.dto";

@Injectable()
export class CumulativeRecordRepository extends Repository<CumulativeRecord> {
  // 일별 데이터 - totalCalories, totalNutrient
  async getDateRecord(
    date: Date,
    userId: string,
    manager: EntityManager
  ): Promise<CumulativeRecordDateDto[]> {
    const cumulativeResult = await manager
      .createQueryBuilder(CumulativeRecord, "entity")
      .select("entity.userId", "userId")
      .addSelect("entity.date", "date")
      .addSelect("SUM(entity.mealTotalCalories)", "totalCalories")
      .addSelect("SUM(entity.carbohydrates)", "carbohydrates")
      .addSelect("SUM(entity.proteins)", "proteins")
      .addSelect("SUM(entity.fats)", "fats")
      .addSelect("SUM(entity.dietaryFiber)", "dietaryFiber")
      .where("DATE_TRUNC('day', entity.date) = :date", { date })
      .andWhere("entity.user_id = :userId", { userId })
      .groupBy("entity.user_id, entity.date") // 순서에 따른 조회 속도 확인하기
      .getRawMany();
    return cumulativeResult;
  }

  // 일별/타입별 데이터 - mealType, calories, (imgURL)
  async getDateMealTypeRecord(
    date: Date,
    userId: string,
    manager: EntityManager
  ): Promise<CumulativeDateMealTypeDto[]> {
    const result = await manager
      .createQueryBuilder(CumulativeRecord, "entity")
      .select(["entity.mealType", "entity.mealTotalCalories", "entity.imageId"])
      .where("DATE_TRUNC('day', entity.date) = :date", { date })
      .andWhere("entity.user_id = :userId", { userId })
      .getMany();
    console.log("getDateMealTypeRecord result", result);
    return result;
    // 날짜를 먼저 조회하는 것 vs 유저 id를 먼저 조회하는 것 -> 무엇이 더 빠를까?
  }

  // 월별 데이터 - date, totalCalories
  async getMonthRecord(
    month: Date,
    userId: string,
    manager: EntityManager
  ): Promise<CumulativeDateMealTypeDto[]> {
    const result = await manager
      .createQueryBuilder(CumulativeRecord, "entity")
      .select("entity.userId", "userId")
      .addSelect("DATE_TRUNC('day', entity.date)", "date")
      .addSelect("SUM(entity.mealTotalCalories)", "mealTotalCalories")
      // .select([
      //   "entity.userId",
      //   "DATE_TRUNC('day', entity.date)",
      //   "SUM(entity.mealTotalCalories)",
      // ])
      .where("entity.user_id = :userId", { userId })
      .andWhere("DATE_TRUNC('month', entity.date) = :month", { month })
      .groupBy("entity.user_id, DATE_TRUNC('day', entity.date)")
      .getRawMany();
    // .getMany();
    return result;
  }

  // 월별 데이터 - date, mealType, calories, (imgURL)
  async getMonthDetailRecord(
    month: Date,
    page: Number,
    userId: string,
    manager: EntityManager
  ) {
    // 날짜 범위 지정
    const result = await manager
      .createQueryBuilder(CumulativeRecord, "entity")
      .where("entity.user_id = :userId", { userId })
      .andWhere("DATE_TRUNC('month', entity.date) = :month", { month })
      // .andWhere("entity.record_ids IN :recordIds", { recordIds })
      .getMany();
    return result;
  }
}
