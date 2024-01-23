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
  constructor(
    private cumulativeRepository: CumulativeRecordRepository
    // private healthInfoRepository: HealthInfoRepository
  ) {}

  async getDateRecord(
    date: Date,
    userId: string
  ): Promise<CumulativeRecordDateDto> {
    // 1) [Cumulative Table] 유저의 일별 모든 meal type의 칼로리 합산 -> totalCalories
    // 2) [Cumulative Table] 유저의 일별 모든 meal type의 탄단지 합산 -> totalNutrient
    // 3) [HealthInfo Table] 유저의 목표 칼로리 조회 -> targetCalories
    // 4) [HealthInfo Table] 유저의 목표 영양성분 조회 -> recommendNutrient

    // [Cumulative Table] - 1) totalCalories, 2) totalNutrient
    const totalResult = this.cumulativeRepository.getDateRecord(date, userId);

    // [HealthInfo Table] - 3) targetCalories, 4) recommendNutrient
    // const result = this.cumulativeRepository.findHealthInfoByUserId(date, userId)
    // findHealthInfoByUserId에 date 추가되어야 하는 부분 명지님께 !
    // const HealthInfoResult = this.healthInfoRepository.findHealthInfoByUserId(
    //   date,
    //   userId
    // );

    const mealTypeResult = this.cumulativeRepository.getDateMealTypeRecord(
      date,
      userId
    );

    return plainToInstance(CumulativeRecordDateDto, totalResult);
    // return 값 dto는 다시 확인 필요
  }

  async getDateMealTypeRecord(date: Date, userId: string) {
    const mealTypeResult = this.cumulativeRepository.getDateMealTypeRecord(
      date,
      userId
    );
    return mealTypeResult;
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
