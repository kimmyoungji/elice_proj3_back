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
      .createQueryBuilder(CumulativeRecord, "entity")
      .select("entity.userId", "userId")
      .addSelect("entity.date", "date")
      .addSelect(
        "CAST(SUM(entity.mealTotalCalories) AS INTEGER)",
        "totalCalories"
      )
      .addSelect("CAST(SUM(entity.carbohydrates) AS INTEGER)", "carbohydrates")
      .addSelect("CAST(SUM(entity.proteins) AS INTEGER)", "proteins")
      .addSelect("CAST(SUM(entity.fats) AS INTEGER)", "fats")
      .addSelect("CAST(SUM(entity.dietaryFiber) AS INTEGER)", "dietaryFiber")
      .where("entity.date = :date", {
        date,
      })
      .andWhere("entity.user_id = :userId", { userId })
      .groupBy("entity.user_id, entity.date") // 순서에 따른 조회 속도 확인하기
      .getRawOne();
  }

  // 일별/타입별 데이터 - mealType, calories, (imgURL)
  async getDateMealTypeRecord(
    date: Date,
    userId: string,
    manager: EntityManager
  ): Promise<CumulativeDateMealTypeDto[]> {
    return await manager
      .createQueryBuilder(CumulativeRecord, "entity")
      .select(["entity.mealType", "entity.mealTotalCalories", "entity.imageId"])
      .where("entity.date = :date", {
        date,
      })
      .andWhere("entity.user_id = :userId", { userId })
      .orderBy("entity.mealType", "ASC")
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
      .createQueryBuilder(CumulativeRecord, "entity")
      .select("entity.userId", "userId")
      .addSelect("entity.date", "date")
      .addSelect("SUM(entity.mealTotalCalories)", "mealTotalCalories")
      .where("entity.user_id = :userId", { userId })
      .andWhere("DATE_TRUNC('month', entity.date) = :month", { month })
      .groupBy("entity.user_id, entity.date")
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
      .createQueryBuilder(CumulativeRecord, "entity")
      .where("entity.user_id = :userId", { userId })
      .andWhere("DATE_TRUNC('month', entity.date) = :month", { month })
      .orderBy("date", "ASC")
      .take(5)
      .skip((page - 1) * 5)
      .getMany();
  }
}
