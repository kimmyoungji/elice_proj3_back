import { Injectable } from "@nestjs/common";
import { CumulativeRecordRepository } from "./cumulative.repository";
import {
  CumulativeDateMealTypeDto,
  CumulativeRecordDateDto,
  // CumulativeRecordMonthDto,
} from "./dtos/cumulative-record.dto";
import { plainToInstance } from "class-transformer";
import { DataSource } from "typeorm";
import { HealthInfoRepository } from "../user/health-info.repository";

@Injectable()
export class CumulativeRecordService {
  constructor(
    private cumulativeRepository: CumulativeRecordRepository,
    private healthInfoRepository: HealthInfoRepository,
    private readonly dataSource: DataSource
  ) {}

  async getDateRecord(
    date: Date,
    userId: string
  ): Promise<CumulativeRecordDateDto[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1) [Cumulative Table] 유저의 일별 모든 meal type의 칼로리 합산 -> totalCalories
      // 2) [Cumulative Table] 유저의 일별 모든 meal type의 탄단지 합산 -> totalNutrient
      // 3) [HealthInfo Table] 유저의 목표 칼로리 조회 -> targetCalories
      // 4) [HealthInfo Table] 유저의 목표 영양성분 조회 -> recommendNutrient
      // 5) [Cumulative Table & Image Table] meal type별 칼로리와 image -> dateArr

      // [Cumulative Table] - 1) totalCalories, 2) totalNutrient
      const totalResult = await this.cumulativeRepository.getDateRecord(
        date,
        userId,
        queryRunner.manager
      );

      console.log("totalResult", totalResult);

      // [HealthInfo Table] - 3) targetCalories, 4) recommendNutrient
      // findHealthInfoByUserId에 date 추가 필요
      const healthUserId = "e3794989-f37a-4edf-95d2-eb305c23b695";
      const HealthInfoResult = this.healthInfoRepository.findHealthInfoByUserId(
        // date,
        healthUserId,
        queryRunner.manager
      );
      // console.log("HealthInfoResult", (await HealthInfoResult).targetCalories);
      // console.log("HealthInfoResult", (await HealthInfoResult).recommendIntake);

      // [Cumulative Table] - 5) dateArr
      const mealTypeResult =
        await this.cumulativeRepository.getDateMealTypeRecord(
          date,
          userId,
          queryRunner.manager
        );

      // [Image Table] - 5) dateArr
      // mealTypeResult에서 받아온 image_id로 이미지들 가져오기
      // const mealTypeImage = this.cumulativeRepository.getDateMealTypeRecord(
      //   date,
      //   userId
      // );

      await queryRunner.commitTransaction();
      return plainToInstance(CumulativeRecordDateDto, totalResult);
      // return 값 dto는 다시 확인 필요
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getDateMealTypeRecord(date: Date, userId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const mealTypeResult =
        await this.cumulativeRepository.getDateMealTypeRecord(
          date,
          userId,
          queryRunner.manager
        );

      // img url 추가
      await queryRunner.commitTransaction();
      return plainToInstance(CumulativeDateMealTypeDto, mealTypeResult);
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getMonthRecord(
    month: Date,
    userId: string
  ): Promise<CumulativeDateMealTypeDto[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await this.cumulativeRepository.getMonthRecord(
        month,
        userId,
        queryRunner.manager
      );
      await queryRunner.commitTransaction();
      return plainToInstance(CumulativeDateMealTypeDto, result);
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getMonthDetailRecord(month: Date, page: Number, userId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await this.cumulativeRepository.getMonthDetailRecord(
        month,
        page,
        userId,
        queryRunner.manager
      );
      await queryRunner.commitTransaction();
      return plainToInstance(CumulativeDateMealTypeDto, result);
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
