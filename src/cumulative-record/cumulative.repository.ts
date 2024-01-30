import { EntityManager } from "typeorm";
import { CumulativeRecord } from "./cumulative-record.entity";
import {
  CumulativeDateMealTypeDto,
  CumulativeRecordDateDto,
} from "./dto/cumulative-record.dto";

export class CumulativeRecordRepository {
  // 일별 데이터 - totalCalories, totalNutrient
  async getDateRecord(
    date: Date,
    userId: string,
    manager: EntityManager
  ): Promise<CumulativeRecordDateDto> {
    return await manager
      .createQueryBuilder(CumulativeRecord, "cumulativeRecord")
      .select("user_id", "userId")
      .addSelect("date")
      .addSelect("CAST(SUM(meal_total_calories) AS INTEGER)", "totalCalories")
      .addSelect("CAST(SUM(carbohydrates) AS INTEGER)", "carbohydrates")
      .addSelect("CAST(SUM(proteins) AS INTEGER)", "proteins")
      .addSelect("CAST(SUM(fats) AS INTEGER)", "fats")
      .addSelect("CAST(SUM(dietary_fiber) AS INTEGER)", "dietaryFiber")
      .where("date = :date", {
        date,
      })
      .andWhere("user_id = :userId", { userId })
      .groupBy("user_id, date") // 순서에 따른 조회 속도 확인하기
      .getRawOne();
  }

  // 일별/타입별 데이터 - mealType, calories, (imgURL)
  async getDateMealTypeRecord(
    date: Date,
    userId: string,
    manager: EntityManager
  ): Promise<CumulativeDateMealTypeDto[]> {
    return await manager
      .createQueryBuilder(CumulativeRecord, "cumulativeRecord")
      .select([
        "cumulativeRecord.mealType",
        "cumulativeRecord.mealTotalCalories",
        "cumulativeRecord.imageId",
        "cumulativeRecord.cumulativeRecordId",
      ])
      .where("date = :date", {
        date,
      })
      .andWhere("user_id = :userId", { userId })
      .orderBy("meal_type", "ASC")
      .getMany();
    // 날짜를 먼저 조회하는 것 vs 유저 id를 먼저 조회하는 것 -> 무엇이 더 빠를까?
  }

  // 월별 데이터 - date, totalCalories
  async getMonthRecord(
    month: Date,
    userId: string,
    manager: EntityManager
  ): Promise<CumulativeDateMealTypeDto[]> {
    return await manager
      .createQueryBuilder(CumulativeRecord, "cumulativeRecord")
      .select("user_id", "userId")
      .addSelect("date")
      .addSelect("SUM(meal_total_calories)", "mealTotalCalories")
      .where("user_id = :userId", { userId })
      .andWhere("DATE_TRUNC('month', date) = :month", { month })
      .groupBy("user_id, date")
      .getRawMany();
  }

  // 월별 데이터 - date, mealType, calories, (imgURL)
  async getMonthDetailRecord(
    month: Date,
    page: number,
    userId: string,
    manager: EntityManager
  ): Promise<CumulativeRecord[]> {
    return await manager
      .createQueryBuilder(CumulativeRecord, "cumulativeRecord")
      .where("user_id = :userId", { userId })
      .andWhere("DATE_TRUNC('month', date) = :month", { month })
      .orderBy({ date: "ASC", meal_type: "ASC" })
      .take(5)
      .skip((page - 1) * 5)
      .getMany();
  }
}
