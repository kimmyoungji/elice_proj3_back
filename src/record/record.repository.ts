import { DataSource, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { Record } from "./record.entity";
import { InjectRepository } from "@nestjs/typeorm";
// import { User } from "src/user/user.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { response } from "express";

@Injectable()
export class RecordRepository extends Repository<Record> {
//   constructor(
//     @InjectRepository(Record) private dataSource: DataSource
//   ) {
//     super(Record, dataSource.manager);
//   }

constructor(@InjectRepository(Record) private recordRepository: Repository<Record>) {
  super(recordRepository.target, recordRepository.manager, recordRepository.queryRunner);
  }

  // 식단 조회
  async findByDate(date: Date): Promise<Record[]> {
    const records = await this.recordRepository.find({
      where: { updatedDate: date },
    });
    return records;
  }
 
  // 식단 기록
  async createRecord(record: {
    recordId: string,
    userId: string,
    mealType: string,
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
    const record = await this.recordRepository.findOne({
      where: { 
        firstRecordDate: LessThanOrEqual(dateObj),
        mealType: mealType
      },
    });
    if (!record) {
      throw new NotFoundException(`Record not found for the date: ${date} and mealType: ${mealType}`);
    }
    this.recordRepository.merge(record, updateData);
    record.updatedDate = new Date();
    return await this.recordRepository.save(record);
  }
  

  
  // 식단 삭제
  async deleteRecord(date: string, mealType: string): Promise<void> {
    const dateObj = new Date(date);
    const result = await this.recordRepository.delete({
      firstRecordDate: LessThanOrEqual(dateObj),
      updatedDate: MoreThanOrEqual(dateObj),
      mealType: mealType
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Record not found for the date: ${date} and mealType: ${mealType}`);
    }
  }
  
}
