import { Any, DataSource, Equal, FindOperator, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { MealType, Record } from "./record.entity";
import { InjectRepository } from "@nestjs/typeorm";
// import { User } from "src/user/user.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RecordDto } from "./dtos/record.dto";
import { CumulativeRecord } from "src/cumulative-record/cumulative-record.entity";
import { FoodInfo } from "src/food-info-api/food-info-api.entity";

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
  async findByDate(date: string): Promise<Record[]> {
    const dateObj = new Date(date);

    const records = await this.recordRepository.find({
      where: { 
        firstRecordDate: Equal(dateObj)
       },
    });
    return records;
  }

// 식사 기록 생성
async createRecord(recordDto: RecordDto): Promise<Record[]> {
  const { userId, mealType, foods, ...restOfRecordDto } = recordDto;
  // 'restOfRecordDto'에는 'RecordDto'의 'userId', 'mealType', 'foods'를 제외한 모든 속성들이 포함됩니다.
  const records: Record[] = [];
  let cumulativeCarbohydrates = 0;
  let cumulativeProteins = 0;
  let cumulativeFats = 0;
  let cumulativeDietaryFiber = 0;
  let cumulativeTotalCalories = 0;

    for (const food of foods) {
      const foodInfo = await this.foodInfoRepository.findOneBy({ food_name: food.foodName });
      if (!foodInfo) {
        throw new NotFoundException(`음식 정보를 찾을 수 없습니다: ${food.foodName}`);
      }

      // food_info_id를 기준으로 기존 레코드 검색
      let record = await this.recordRepository.findOne({
        where: {
          foodInfoId: foodInfo.food_info_id,
          userId: userId,
          mealType: mealType
        }
      });
      console.log("record : " + record)
      if (record) {
        // 기존 레코드가 있다면, counts 및 영양소 정보 업데이트
        record.foodCounts += food.counts;
        record.carbohydrates += foodInfo.carbohydrates * food.counts;
        record.proteins += foodInfo.proteins * food.counts;
        record.fats += foodInfo.fats * food.counts;
        record.dietaryFiber += foodInfo.dietary_fiber * food.counts;
        record.totalCalories += foodInfo.calories * food.counts;
        record.updatedDate = new Date(); // 업데이트 날짜 갱신

        cumulativeCarbohydrates += record.carbohydrates;
        cumulativeProteins += record.proteins;
        cumulativeFats += record.fats;
        cumulativeDietaryFiber += record.dietaryFiber;
        cumulativeTotalCalories += record.totalCalories;
        
        records.push(record);
        await this.createOrUpdateCumulativeRecord(
          record, 
          cumulativeTotalCalories,
          cumulativeCarbohydrates, 
          cumulativeProteins, 
          cumulativeFats, 
          cumulativeDietaryFiber
        );
      } else{
        const newRecord = this.recordRepository.create({
          userId: userId,
          mealType: mealType,
          foodInfoId: foodInfo.food_info_id,
          foodCounts: food.counts,
          // foodImage: undefined, //food.foodImage, // image_id는 이미지 엔티티와의 관계를 설정하여 저장해야 합니다.
          carbohydrates: foodInfo.carbohydrates,
          proteins: foodInfo.proteins,
          fats: foodInfo.fats,
          dietaryFiber: foodInfo.dietary_fiber,
          totalCalories: foodInfo.calories,
          firstRecordDate: new Date(),
          updatedDate: new Date(),
        });

        cumulativeCarbohydrates += newRecord.carbohydrates;
        cumulativeProteins += newRecord.proteins;
        cumulativeFats += newRecord.fats;
        cumulativeDietaryFiber += newRecord.dietaryFiber;
        cumulativeTotalCalories += newRecord.totalCalories
        records.push(newRecord);
        await this.createOrUpdateCumulativeRecord(
          newRecord, 
          cumulativeTotalCalories,
          cumulativeCarbohydrates, 
          cumulativeProteins, 
          cumulativeFats, 
          cumulativeDietaryFiber
        );
      }
    }
    // 모든 레코드를 데이터베이스에 저장합니다.
    await this.recordRepository.save(records);
    
    return records;
  }

// 누적 레코드 생성
async createOrUpdateCumulativeRecord(record: Record, totalCalories: number, carbohydrates: number, proteins: number, fats: number, dietaryFiber: number) {
  const existingCumulativeRecord = await this.cumulativeRecordRepository.findOne({
    where: {
      userId: record.userId,
      mealType: record.mealType
    }
  });

  if (!existingCumulativeRecord) {
    // 새로운 레코드 생성
    const newCumulativeRecord = new CumulativeRecord();
    newCumulativeRecord.userId = record.userId;
    newCumulativeRecord.mealType = record.mealType;
    newCumulativeRecord.date = new Date();
    newCumulativeRecord.mealTotalCalories = totalCalories;
    newCumulativeRecord.carbohydrates = carbohydrates;
    newCumulativeRecord.proteins = proteins;
    newCumulativeRecord.fats = fats;
    newCumulativeRecord.dietaryFiber = dietaryFiber;
    newCumulativeRecord.imageId = record.imageId;
    await this.cumulativeRecordRepository.save(newCumulativeRecord);
  } else {
    // 기존 레코드 업데이트
    existingCumulativeRecord.mealTotalCalories = totalCalories;
    existingCumulativeRecord.carbohydrates = carbohydrates;
    existingCumulativeRecord.proteins = proteins;
    existingCumulativeRecord.fats = fats;
    existingCumulativeRecord.dietaryFiber = dietaryFiber;

    await this.cumulativeRecordRepository.save(existingCumulativeRecord);
  }
}


// 식단 수정
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

  // 영양소 값 업데이트를 위해 foodInfo 테이블 조회
  let totalCalories = 0;
  let carbohydrates = 0;
  let proteins = 0;
  let fats = 0;
  let dietaryFiber = 0;

  // if (updateData.foods) {
  //   for (const food of updateData.foods) {
  //     const foodInfo = await this.foodInfoRepository.findOne({ where: { food_name: food.foodName } });
  //     if (!foodInfo) {
  //       throw new NotFoundException(`음식 정보를 찾을 수 없습니다: ${food.foodName}`);
  //     }

  //     // 영양소 계산
  //     totalCalories += foodInfo.calories;
  //     carbohydrates += foodInfo.carbohydrates;
  //     proteins += foodInfo.proteins;
  //     fats += foodInfo.fats;
  //     dietaryFiber += foodInfo.dietary_fiber;
  //   }
  // }

  // 계산된 영양소 값들을 레코드에 할당
  record.totalCalories = totalCalories;
  record.carbohydrates = carbohydrates;
  record.proteins = proteins;
  record.fats = fats;
  record.dietaryFiber = dietaryFiber;
  record.updatedDate = new Date();

  await this.recordRepository.merge(record, updateData);

  // 누적 레코드 업데이트
  // await this.createOrUpdateCumulativeRecord(record.recordId, record, totalCalories, carbohydrates, proteins, fats, dietaryFiber);

  // 레코드 업데이트

  const updatedRecord = await this.recordRepository.save(record);

  return updatedRecord;
}
  
  
  // 식단 삭제
  async deleteRecord(date: string, mealType: string): Promise<void> {
    const mealTypeEnum = MealType[mealType as keyof typeof MealType];
    const dateObj = new Date(date);
    const result = await this.recordRepository.delete({
      firstRecordDate: Equal(dateObj),
      mealType: mealTypeEnum
    });
    if (result.affected === 0) {
      throw new NotFoundException(`There is no record for that date or the meal type is incorrect`);
    }
  }
  
}
