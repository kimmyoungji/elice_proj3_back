import { DataSource, Repository } from "typeorm";
import { Record } from "./record.entity";
import { InjectRepository } from "@nestjs/typeorm";
// import { User } from "src/user/user.entity";
import { Injectable } from "@nestjs/common";

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
     where: {
       first_record_date: date,
     },
   });
   return records;
 }
 
// 식단 기록
async createRecord(record: {
  record_id: string,
  user_id: string,
  meal_type: string,
  food_info_id: string,
  food_counts: number,
  carbohydrates?: number,
  proteins?: number,
  fats?: number,
  dietary_fiber?: number,
  total_calories?: number,
  first_record_date?: Date,
  updated_date?: Date,
}): Promise<Record> {
  return await this.recordRepository.save(record);
}

//  // 식단 수정
//  async updateRecord(record: Record): Promise<Record> {
//    const { record_id, user_id, meal_type, food_info_id, ...updateData } = record;
//    // 업데이트할 데이터에서 식별자 속성 제거 후 업데이트
//    await this.recordRepository.update(record_id, updateData);
//    return this.recordRepository.findOneBy({record_id});
//  }
 
//  // 식단 삭제
//  async deleteRecord(record: Record): Promise<void> {
//    await this.recordRepository.delete(record.record_id);
//  }
 
}
