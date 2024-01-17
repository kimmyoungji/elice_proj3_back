import { DataSource, Equal, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { MealType, Record } from "./record.entity";
import { InjectRepository } from "@nestjs/typeorm";
// import { User } from "src/user/user.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { response } from "express";

@Injectable()
export class RecordRepository extends Repository<Record> {

constructor(@InjectRepository(Record) private recordRepository: Repository<Record>) {
  super(recordRepository.target, recordRepository.manager, recordRepository.queryRunner);
  }

  // 식단 조회
  async findByDate(date: string, mealType: string): Promise<Record[]> {
    const dateObj = new Date(date);
    const mealTypeEnum = MealType[mealType as keyof typeof MealType]

    if (!mealTypeEnum) {
      throw new BadRequestException(`Invalid mealType: ${mealType}`);
    }

    const records = await this.recordRepository.find({
      where: { 
        firstRecordDate: LessThanOrEqual(dateObj),
        mealType: mealTypeEnum 
       },
    });
    return records;
  }
 
  // 식단 기록
  async createRecord(record: {
    recordId: string,
    userId: string,
    mealType: MealType,
    foodInfoId: string,
    foodCounts: number,
    carbohydrates?: number,
    proteins?: number,
    fats?: number,
    dietaryFiber?: number,
    totalCalories?: number,
    firstRecordDate?: Date,
    updatedDate?: Date,
  }): Promise<Record> {
    record.firstRecordDate = new Date();
    record.updatedDate = new Date();
    return await this.recordRepository.save(record);
  }

  // 식단수정
  async updateRecord(date: string, mealType: string, updateData: Partial<Record>): Promise<Record> {
    const dateObj = new Date(date);
    const mealTypeEnum = MealType[mealType as keyof typeof MealType];

    if (!mealTypeEnum) {
      throw new BadRequestException(`잘못된 식사 유형: ${mealType}`);
    }
    const record = await this.recordRepository.findOne({
      where: { 
        firstRecordDate: Equal(dateObj),
        mealType: mealTypeEnum 
      },
    });
    if (!record) {
      throw new NotFoundException(`해당 날짜 레코드가 없거나 식사 유형이 옳지 않습니다`);
    }
    this.recordRepository.merge(record, updateData);
    record.updatedDate = new Date();
    return await this.recordRepository.save(record);
  }
  

  
  // 식단 삭제
  async deleteRecord(date: string, mealType: string): Promise<void> {
    const mealTypeEnum = MealType[mealType as keyof typeof MealType];
    const dateObj = new Date(date);
    const result = await this.recordRepository.delete({
      firstRecordDate: LessThanOrEqual(dateObj),
      mealType: mealTypeEnum 
    });
    if (result.affected === 0) {
      throw new NotFoundException(`해당 날짜 레코드가 없거나 식사 유형이 옳지 않습니다`);
    }
  }
  
}
