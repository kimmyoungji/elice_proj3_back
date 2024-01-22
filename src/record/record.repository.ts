import { DataSource, Equal, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { MealType, Record } from "./record.entity";
import { InjectRepository } from "@nestjs/typeorm";
// import { User } from "src/user/user.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RecordDto } from "./dtos/record.dto";
import { CumulativeRecord } from "src/cumulative-record/cumulative-record.entity";
import { FoodInfo } from "src/food-info-api/food-info-api.entity";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

@Injectable()
export class RecordRepository extends Repository<Record> {

  constructor(
    @InjectRepository(Record) private recordRepository: Repository<Record>,
    @InjectRepository(FoodInfo) private foodInfoRepository: Repository<FoodInfo>,
    @InjectRepository(CumulativeRecord) private cumulativeRecordRepository: Repository<CumulativeRecord>
  ) {
    super(recordRepository.target, recordRepository.manager, recordRepository.queryRunner);
  }

  // 식단 조회
  async findByDate(date: string, mealType: string): Promise<Record[]> {
    const dateObj = new Date(date);
    const mealTypeEnum = MealType[mealType as keyof typeof MealType]

    if (!mealTypeEnum) {
      throw new BadRequestException(`유효하지 않은 식사 유형: ${mealType}`);
    }

    const records = await this.recordRepository.find({
      where: { 
        firstRecordDate: Equal(dateObj),
        mealType: mealTypeEnum 
       },
    });
    return records;
  }

// 식사 기록 생성
async createRecord(recordDto: RecordDto): Promise<Record> {
  // foods 배열을 제외한 나머지 DTO 속성들로 레코드 생성
  const { foods, ...rest } = recordDto;
  const record = this.recordRepository.create(rest);

  // 각 영양소 총합을 저장할 변수 초기화
  let totalCalories = 0;
  let carbohydrates = 0;
  let proteins = 0;
  let fats = 0;
  let dietaryFiber = 0;

  // foods 배열 내의 각 음식에 대한 정보를 foodInfo 테이블에서 검색
  for (const food of foods) {
    const foodInfo = await this.foodInfoRepository.findOne({ where: { food_name: food.foodName } });
    if (!foodInfo) {
      throw new NotFoundException(`음식 정보를 찾을 수 없습니다: ${food.foodName}`);
    }

    // 영양소 계산
    totalCalories += foodInfo.calories * food.foodCounts;
    carbohydrates += foodInfo.carbohydrates * food.foodCounts;
    proteins += foodInfo.proteins * food.foodCounts;
    fats += foodInfo.fats * food.foodCounts;
    dietaryFiber += foodInfo.dietary_fiber * food.foodCounts;
  }

  // 계산된 영양소 값들을 레코드에 할당
  record.totalCalories = totalCalories;
  record.carbohydrates = carbohydrates;
  record.proteins = proteins;
  record.fats = fats;
  record.dietaryFiber = dietaryFiber;
  recordDto.firstRecordDate = new Date();
  recordDto.updatedDate = new Date();

  const savedRecord = await this.recordRepository.save(record);

  // 저장된 record에서 recordId 추출
  const recordId = savedRecord.recordId;

  const cumulativeRecord = new CumulativeRecord();
    cumulativeRecord.userId = record.userId;
    cumulativeRecord.mealType = record.mealType;
    cumulativeRecord.date = new Date();
    cumulativeRecord.mealTotalCalories = totalCalories;
    cumulativeRecord.carbohydrates = carbohydrates;
    cumulativeRecord.proteins = proteins;
    cumulativeRecord.fats = fats;
    cumulativeRecord.dietaryFiber = dietaryFiber;
    // cumulativeRecord.record_ids는 필요에 따라 설정
    // JSON 배열로 변환하여 저장
    const recordIdsArray = [recordId];
    console.log("recordIdsArray : ", recordIdsArray)
    const recordIdsString = "{" + recordIdsArray.join(", ") + "}"; // PostgreSQL 배열 형식으로 변환
    cumulativeRecord.recordIds = recordIdsString;


    // 누적 레코드 저장
    await this.cumulativeRecordRepository.save(cumulativeRecord);

    // 레코드 저장
    return savedRecord;
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
    await this.recordRepository.merge(record, updateData);
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
