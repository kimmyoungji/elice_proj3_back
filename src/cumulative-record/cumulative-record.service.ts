import { Injectable } from "@nestjs/common";
import { CumulativeRecordRepository } from "./cumulative.repository";
import {
  CumulativeDateMealTypeDto,
  CumulativeRecordDateDto,
  CumulativeRecordMonthDto,
} from "./dtos/cumulative-record.dto";
import { plainToInstance } from "class-transformer";
import { DataSource } from "typeorm";
// import { HealthInfoRepository } from "src/user/health-info.repository";

@Injectable()
export class CumulativeRecordService {
  constructor(
    private cumulativeRepository: CumulativeRecordRepository,
    private readonly dataSource?: DataSource
    // private healthInfoRepository: HealthInfoRepository
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
        userId
      );

      // [HealthInfo Table] - 3) targetCalories, 4) recommendNutrient
      // const result = this.cumulativeRepository.findHealthInfoByUserId(date, userId)
      // findHealthInfoByUserId에 date 추가되어야 하는 부분 명지님께 !
      // const HealthInfoResult = this.healthInfoRepository.findHealthInfoByUserId(
      //   date,
      //   userId
      // );

      // [Cumulative Table] - 5) dateArr
      const mealTypeResult =
        await this.cumulativeRepository.getDateMealTypeRecord(date, userId);

      // [Image Table] - 5) dateArr
      // mealTypeResult에서 받아온 record_ids로 이미지들 가져오기
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
        await this.cumulativeRepository.getDateMealTypeRecord(date, userId);

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
  ): Promise<CumulativeRecordMonthDto[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await this.cumulativeRepository.getMonthRecord(
        month,
        userId
      );
      await queryRunner.commitTransaction();
      return plainToInstance(CumulativeRecordMonthDto, result);
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getMonthDetailRecord(page: Number, userId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await this.cumulativeRepository.getMonthDetailRecord(
        page,
        userId
      );
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
