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
import { ImageRepository } from "src/image/repositories/image.repository";

@Injectable()
export class CumulativeRecordService {
  constructor(
    private cumulativeRepository: CumulativeRecordRepository,
    private healthInfoRepository: HealthInfoRepository,
    private imageRepository: ImageRepository,
    private readonly dataSource: DataSource
  ) {}

  async getDateRecord(date: Date, userId: string) {
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
      let totalResult = await this.cumulativeRepository.getDateRecord(
        date,
        userId,
        queryRunner.manager
      );
      totalResult = plainToInstance(CumulativeRecordDateDto, totalResult);
      console.log("totalResult Service", totalResult);

      // [HealthInfo Table] - 3) targetCalories, 4) recommendNutrient
      const HealthInfoResult = this.healthInfoRepository.findHealthInfoByUserId(
        date,
        userId,
        queryRunner.manager
      );

      await queryRunner.commitTransaction();
      const result = {
        totalResult,
        HealthInfoResult,
      };
      return result;
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
      const mealTypeImage = [];
      mealTypeResult.map(async (image, index) => {
        const imageId = image.imageId;
        if (imageId) {
          const mealTypeImageResult =
            await this.imageRepository.getImageByImageId(
              imageId,
              queryRunner.manager
            );
          mealTypeImage[index] = mealTypeImageResult.foodImageUrl;
        } else {
          mealTypeImage[index] = null;
        }
      });

      await queryRunner.commitTransaction();
      const result = {
        mealTypeResult,
        mealTypeImage,
      };
      // return plainToInstance(CumulativeDateMealTypeDto, result);
      return result;
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

  async getMonthDetailRecord(month: Date, page: number, userId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const mealData = await this.cumulativeRepository.getMonthDetailRecord(
        month,
        page,
        userId,
        queryRunner.manager
      );
      const mealTypeImage = [];
      mealData.map(async (image, index) => {
        const imageId = image.imageId;
        if (imageId) {
          const mealTypeImageResult =
            await this.imageRepository.getImageByImageId(
              imageId,
              queryRunner.manager
            );
          mealTypeImage[index] = mealTypeImageResult.foodImageUrl;
        } else {
          mealTypeImage[index] = null;
        }
      });
      await queryRunner.commitTransaction();
      // return plainToInstance(CumulativeDateMealTypeDto, result);
      return { mealData, mealTypeImage };
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
