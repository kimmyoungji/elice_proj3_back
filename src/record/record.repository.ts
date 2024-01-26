import { Any, DataSource, Equal, FindOperator, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { MealType, Record } from "./record.entity";
import { InjectRepository } from "@nestjs/typeorm";
// import { User } from "src/user/user.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateRecordDto } from "./dtos/createRecord.dto";
import { CumulativeRecord } from "src/cumulative-record/cumulative-record.entity";
import { FoodInfo } from "src/food-info-api/food-info-api.entity";
import { Image } from "src/image/entities/image.entity";
import { SplitImage } from "src/image/entities/splitImage.entity";
import { UpdateRecordDto } from "./dtos/updateRecord.dto";

@Injectable()
export class RecordRepository extends Repository<Record> {

  constructor(
    @InjectRepository(Record) private recordRepository: Repository<Record>,
    @InjectRepository(FoodInfo) private foodInfoRepository: Repository<FoodInfo>,
    @InjectRepository(CumulativeRecord) private cumulativeRecordRepository: Repository<CumulativeRecord>,
    @InjectRepository(Image) private imageRecordRepository: Repository<Image>,
    @InjectRepository(SplitImage) private splitImageRepository: Repository<SplitImage>
  ) {
    super(recordRepository.target, recordRepository.manager, recordRepository.queryRunner);
  }

// 날짜에 해당하는 식사 기록을 조회하는 함수
async findByDate(date: string): Promise<any> { // 반환 타입을 any로 변경하거나 적절한 타입을 생성해야 합니다.
  const dateObj = new Date(date);

  const records = await this.recordRepository.find({
    where: {
      firstRecordDate: Equal(dateObj)
    }
  });

  if (!records.length) {
    throw new NotFoundException(`해당 날짜에 대한 기록을 찾을 수 없습니다: ${date}`);
  }

  let foods = await this.foodInfoRepository.find({
    where: {
      foodInfoId: records[0].foodInfoId
    }
  })

  // 클라이언트 형식에 맞게 레코드를 변환합니다.
  const meals = records.reduce((acc, record) => {
    const mealType = record.mealType;
    const food = {
      foodName: record.foodInfoId, // foodInfoId 대신 food_name을 사용해야 합니다.
      counts: record.foodCounts,
      XYCoordinate: [] 
    };

    if (!acc[mealType]) {
      acc[mealType] = { foods: [], totalCalories: 0, totalNutrient: {} };
    }

    acc[mealType].foods.push(food);
    acc[mealType].totalCalories += record.totalCalories;
    // 총 영양소 계산 로직 추가
    // ...여기에 로직 추가...

    return acc;
  }, {});

  // 최종 데이터를 클라이언트에 전달할 형식으로 구성
  const response = {
    ...meals,
    targetCalories: 2400,
    recommendNutrient: {
      carbohydrates: 240, 
      proteins: 80,
      fats: 25,
      dietaryFiber: 2
    },
    imgurl: undefined
  };

  return response; // 'Record[]' 대신 클라이언트 형식의 객체를 반환합니다.
}

// 식사 기록 생성 [POST 요청이 한 번만 일어난다는 가정]
async createRecord(createRecordDto: CreateRecordDto): Promise<Record[]> {
  const { userId, mealType, foodImageUrl, foods } = createRecordDto;
  const records: Record[] = [];
  let cumulativeCarbohydrates = 0;
  let cumulativeProteins = 0;
  let cumulativeFats = 0;
  let cumulativeDietaryFiber = 0;
  let cumulativeTotalCalories = 0;

  const foodImage = await this.imageRecordRepository.findOneBy({
    foodImageUrl: foodImageUrl
  })
  if (!foodImage) {
    throw new NotFoundException(`이미지를 찾을 수 없습니다: ${foodImageUrl}`);
  }

  for (const food of foods) {
    const foodInfo = await this.foodInfoRepository.findOneBy({ foodName: food.foodName });
    console.log("foodInfo : " + foodInfo.foodName)
    
    if (!foodInfo) {
      throw new NotFoundException(`음식 정보를 찾을 수 없습니다: ${food.foodName}`);
    }

    const newRecord = this.recordRepository.create({
      userId: userId,
      mealType: mealType,
      foodInfoId: foodInfo.foodInfoId,
      foodCounts: food.counts,
      imageId: foodImage.imageId,
      carbohydrates: foodInfo.carbohydrates,
      proteins: foodInfo.proteins,
      fats: foodInfo.fats,
      dietaryFiber: foodInfo.dietaryFiber,
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

    const splitImageEntry = this.splitImageRepository.create({
      imageId: foodImage.imageId,
      xCoordinate: food.XYCoordinate[0],
      yCoordinate: food.XYCoordinate[1],
      width: food.XYCoordinate[2],
      height: food.XYCoordinate[3],
      createdAt: new Date()
    });
  
    await this.splitImageRepository.save(splitImageEntry);
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
    newCumulativeRecord.date = record.firstRecordDate;
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
async updateRecord( date: string, queryMealType: number, updateRecordDto: UpdateRecordDto ): Promise<Record[]> {

  // recordId를 받자..
  return []

}
  
  // 식단 삭제
  async deleteRecord(date: string, mealType: number): Promise<void> {
    const dateObj = new Date(date);

    // Record 삭제
    const recordResult = await this.recordRepository.delete({
      firstRecordDate: Equal(dateObj),
      mealType: mealType
    });
    
    if (recordResult.affected === 0) {
      throw new NotFoundException(`해당 날짜나 식사 유형에 대한 기록이 없습니다.`);
    }

    // 연관된 CumulativeRecord 삭제
    const cumulativeRecordResult = await this.cumulativeRecordRepository.delete({
      date: Equal(dateObj),
      mealType: mealType
    });

    if (cumulativeRecordResult.affected === 0) {
      console.log(`해당 날짜나 식사 유형에 대한 누적 기록이 없습니다.`);
    }
  }
  
}
