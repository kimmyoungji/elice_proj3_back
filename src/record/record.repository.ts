import {
  Equal,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from "typeorm";
import { MealType, Record } from "./record.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRecordDto } from "./dtos/createRecord.dto";
import { CumulativeRecord } from "src/cumulative-record/cumulative-record.entity";
import { FoodInfo } from "src/food-info/food-info.entity";
import { Image } from "src/image/entities/image.entity";
import { SplitImage } from "src/image/entities/splitImage.entity";
import { UpdateRecordDto } from "./dtos/updateRecord.dto";
import { HealthInfo } from "src/user/entities/health-info.entity";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class RecordRepository extends Repository<Record> {
  constructor(
    @InjectRepository(Record) private recordRepository: Repository<Record>,
    @InjectRepository(FoodInfo) private foodInfoRepository: Repository<FoodInfo>,
    @InjectRepository(CumulativeRecord) private cumulativeRecordRepository: Repository<CumulativeRecord>,
    @InjectRepository(Image) private imageRecordRepository: Repository<Image>,
    @InjectRepository(SplitImage) private splitImageRepository: Repository<SplitImage>,
    @InjectRepository(HealthInfo) private healthInfoRepository: Repository<HealthInfo>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
    super(
      recordRepository.target,
      recordRepository.manager,
      recordRepository.queryRunner
    );
  }

  // 식단 조회
  async findByDate(userId: string, date: string): Promise<any> {
    const dateObj = new Date(date);
    const records = await this.recordRepository.find({
      where: {
        userId: userId,
        firstRecordDate: Equal(dateObj),
      },
    });

    // 사용자 정보
    const user = await this.userRepository.findOne({
      where: {
        userId: userId
      }
    })
  
    // 사용자의 건강 정보
    const healthInfo = await this.healthInfoRepository.findOne({
      where: {
        userId: userId,
        healthInfoId: user.recentHealthInfoId,
      },
    });
  
    if (!healthInfo) {
      throw new NotFoundException(`Health info 정보가 없는 user ID ${userId}`);
    }
  
    const recommendIntake = healthInfo.recommendIntake || [0, 0, 0, 0]; // 기본값

    // 각 mealType에 대한 기본 정보를 설정
    const defaultMealInfo = {
      targetCalories: healthInfo.targetCalories,
      recommendNutrient: {
        carbohydrates: recommendIntake[0],
        proteins: recommendIntake[1],
        fats: recommendIntake[2],
        dietaryFiber: recommendIntake[3],
      },
    };
  
    // mealType에 따라 정보를 누적할 객체를 준비
    const mealAccumulator = {};
    for (let mealType = 1; mealType <= 4; mealType++) {
      mealAccumulator[mealType] = { 
        foods: [], 
        totalCalories: 0, 
        totalNutrient: { carbohydrates: 0, proteins: 0, fats: 0, dietaryFiber: 0 }, 
        ...defaultMealInfo 
      };
    }
  
    // 조회된 레코드들을 처리
    for (const record of records) {
      const foodInfo = await this.foodInfoRepository.findOne({
        where: {
          foodInfoId: record.foodInfoId,
        },
      });
      
      if (!foodInfo) {
        continue; // 음식 정보가 없는 경우에는 이 레코드를 건너뜀
      }
  
      const splitImageRecord = await this.splitImageRepository.findOne({
        where: {
          imageId: record.imageId,
        },
      });
  
      const mealType = record.mealType;
      const foodData = {
        foodInfoId: record.foodInfoId,
        recordId: record.recordId,
        recordFoodName: record.recordFoodName,
        counts: record.foodCounts,
        XYCoordinate: splitImageRecord ? [splitImageRecord.xCoordinate, splitImageRecord.yCoordinate, splitImageRecord.width, splitImageRecord.height] : [],
      };
  
      // 각 영양소의 누적 값을 계산
      mealAccumulator[mealType].totalCalories += record.totalCalories;
      mealAccumulator[mealType].totalNutrient.carbohydrates += record.carbohydrates;
      mealAccumulator[mealType].totalNutrient.proteins += record.proteins;
      mealAccumulator[mealType].totalNutrient.fats += record.fats;
      mealAccumulator[mealType].totalNutrient.dietaryFiber += record.dietaryFiber;
  
      // 해당 식사 유형에 음식 데이터를 추가
      mealAccumulator[mealType].foods.push(foodData);
    }
  
  // 최종 정보 반환
  const response = {};
  for (const mealType in mealAccumulator) {
    if (mealAccumulator[mealType].foods.length > 0) {
      response[mealType] = mealAccumulator[mealType];
    } else {
      // foods 배열이 비어 있으면 defaultMealInfo만 포함
      response[mealType] = { ...defaultMealInfo };
    }
  }

  return response;
}

  // 식사 기록 생성
  async createRecord(userId: string, createRecordDto: CreateRecordDto): Promise<Record[]> {
    const { mealType, imgUrl, foods } = createRecordDto;
    const records: Record[] = [];
    let cumulativeCarbohydrates = 0;
    let cumulativeProteins = 0;
    let cumulativeFats = 0;
    let cumulativeDietaryFiber = 0;
    let cumulativeTotalCalories = 0;

    const foodImage = await this.imageRecordRepository.findOneBy({
      foodImageUrl: imgUrl,
    });
    if (!foodImage) {
      throw new NotFoundException(`이미지를 찾을 수 없습니다: ${imgUrl}`);
    }

    for (const food of foods) {
      const foodInfo = await this.foodInfoRepository.findOneBy({
        foodInfoId: food.foodInfoId,
      });

      if (!foodInfo) {
        throw new NotFoundException(
          `음식 정보를 찾을 수 없습니다: ${food.foodInfoId}`
        );
      }

      const newRecord = this.recordRepository.create({
        userId: userId,
        mealType: mealType,
        foodInfoId: food.foodInfoId,
        recordFoodName: food.foodName,
        foodCounts: food.counts,
        imageId: foodImage.imageId,
        carbohydrates: foodInfo.carbohydrates * food.counts,
        proteins: foodInfo.proteins * food.counts,
        fats: foodInfo.fats * food.counts,
        dietaryFiber: foodInfo.dietaryFiber * food.counts,
        totalCalories: foodInfo.calories * food.counts,
        firstRecordDate: new Date(),
        updatedDate: new Date(),
      });

      cumulativeCarbohydrates += newRecord.carbohydrates;
      cumulativeProteins += newRecord.proteins;
      cumulativeFats += newRecord.fats;
      cumulativeDietaryFiber += newRecord.dietaryFiber;
      cumulativeTotalCalories += newRecord.totalCalories;
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
        foodName: food.foodName,
        xCoordinate: food.XYCoordinate[0],
        yCoordinate: food.XYCoordinate[1],
        width: food.XYCoordinate[2],
        height: food.XYCoordinate[3],
        createdAt: new Date(),
      });

      await this.splitImageRepository.save(splitImageEntry);
    }

    // 모든 레코드를 데이터베이스에 저장
    await this.recordRepository.save(records);

    return records;
  }

  // 누적 레코드 생성
  async createOrUpdateCumulativeRecord(
    record: Record,
    totalCalories: number,
    carbohydrates: number,
    proteins: number,
    fats: number,
    dietaryFiber: number
  ) {
    const existingCumulativeRecord =
      await this.cumulativeRecordRepository.findOne({
        where: {
          userId: record.userId,
          mealType: record.mealType,
          date: record.firstRecordDate
        },
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
  async updateRecord(userId: string, date: string, mealType: number, updateRecordDto: UpdateRecordDto): Promise<any> {
    const recordDate = new Date(date);
    const { foods } = updateRecordDto;
  
    // 기존 레코드 검색
    const existingRecords = await this.recordRepository.find({
      where: {
        userId,
        mealType,
        firstRecordDate: recordDate,
      },
    });

    console.log("existingRecords : ", existingRecords)

    const imageRecord = await this.imageRecordRepository.findOneBy({
      foodImageUrl: updateRecordDto.imgUrl,
    });
  
    // 기존 데이터 업데이트
    const updatedFoodIds = new Set();
    for (const food of foods) {
      // 동일한 mealType과 foodInfoId를 가진 레코드를 찾기
      const existingRecord = await this.recordRepository.findOne({
        where: {
          userId: userId,
          mealType: mealType,
          recordFoodName: food.foodName
        }
      });
      console.log("existingRecord :", existingRecord)
      const foodInfo = await this.foodInfoRepository.findOneBy({
        foodInfoId: food.foodInfoId,
      });

      if (existingRecord) {
        // 기존 레코드의 영양소 값을 업데이트
        const updatedRecord = {
          ...existingRecord,
          foodCounts: food.counts,
          carbohydrates: foodInfo.carbohydrates * food.counts,
          proteins: foodInfo.proteins * food.counts,
          fats: foodInfo.fats * food.counts,
          dietaryFiber: foodInfo.dietaryFiber * food.counts,
          totalCalories: foodInfo.calories * food.counts,
          updatedDate: new Date()
        };
    
        // 레코드 업데이트
        await this.recordRepository.save(updatedRecord);

      // split_image 테이블에서 해당 imageId를 가진 레코드를 찾아 정보를 업데이트
      const splitImageRecord = await this.splitImageRepository.findOneBy({
        imageId: existingRecord.imageId,
        foodName: existingRecord.recordFoodName
      });

      if (splitImageRecord) {
        // 전달받은 XY 좌표 정보로 split_image 레코드를 업데이트
        splitImageRecord.foodName = food.foodName;
        splitImageRecord.xCoordinate = food.XYCoordinate[0];
        splitImageRecord.yCoordinate = food.XYCoordinate[1];
        splitImageRecord.width = food.XYCoordinate[2];
        splitImageRecord.height = food.XYCoordinate[3];
        await this.splitImageRepository.save(splitImageRecord);
      }
      updatedFoodIds.add(food.foodInfoId);
    } else {
      // 존재하지 않으면 새로운 레코드를 생성
      await this.recordRepository.insert({
        userId: userId,
        mealType: mealType,
        foodInfoId: food.foodInfoId,
        recordFoodName: food.foodName,
        foodCounts: food.counts,
        imageId: imageRecord.imageId,
        carbohydrates: foodInfo.carbohydrates * food.counts,
        proteins: foodInfo.proteins * food.counts,
        fats: foodInfo.fats * food.counts,
        dietaryFiber: foodInfo.dietaryFiber * food.counts,
        totalCalories: foodInfo.calories * food.counts,
        firstRecordDate: new Date(recordDate),
        updatedDate: new Date(),
      });      
      updatedFoodIds.add(food.foodInfoId);

      const splitImageEntry = this.splitImageRepository.create({
        imageId: imageRecord.imageId,
        foodName: food.foodName,
        xCoordinate: food.XYCoordinate[0],
        yCoordinate: food.XYCoordinate[1],
        width: food.XYCoordinate[2],
        height: food.XYCoordinate[3],
        createdAt: new Date(),
      });

      await this.splitImageRepository.save(splitImageEntry);
    }

    // 있다가 없어진 데이터 삭제
    const recordsToDelete = existingRecords.filter(record => !updatedFoodIds.has(record.foodInfoId));
    for (const record of recordsToDelete) {
      const foodForDelete = await this.foodInfoRepository.findOne({
        where: {
          foodInfoId: record.foodInfoId
        }
      });

      await this.splitImageRepository.delete({
        imageId: record.imageId,
        foodName: record.recordFoodName
      });

      // 레코드 삭제
      await this.recordRepository.delete(record.recordId);  
 
    }
    // 누적 영양 정보 업데이트
    await this.updateCumulativeNutrients(userId, mealType, recordDate);    
  }
}

  // 누적 정보 업데이트 로직
  async updateCumulativeNutrients(userId: string, mealType: number, date: Date) {
    // 누적 영양소 정보를 계산할 객체 초기화
    let cumulative = {
      carbohydrates: 0,
      proteins: 0,
      fats: 0,
      dietaryFiber: 0,
      totalCalories: 0
    };

    // 해당 사용자의 모든 식사 기록을 검색
    const records = await this.recordRepository.find({
      where: { userId, mealType, firstRecordDate: date }
    });

    // 각 기록에 대해 누적 영양소 및 칼로리 계산
    records.forEach(record => {
      cumulative.carbohydrates += record.carbohydrates;
      cumulative.proteins += record.proteins;
      cumulative.fats += record.fats;
      cumulative.dietaryFiber += record.dietaryFiber;
      cumulative.totalCalories += record.totalCalories;
    });

    // 해당 날짜와 식사 유형에 대한 누적 레코드를 찾음
    const cumulativeRecord = await this.cumulativeRecordRepository.findOne({
      where: { userId, mealType, date }
    });

    if (cumulativeRecord) {
      // 기존 누적 레코드 업데이트
      cumulativeRecord.carbohydrates = cumulative.carbohydrates;
      cumulativeRecord.proteins = cumulative.proteins;
      cumulativeRecord.fats = cumulative.fats;
      cumulativeRecord.dietaryFiber = cumulative.dietaryFiber;
      cumulativeRecord.mealTotalCalories = cumulative.totalCalories;
      await this.cumulativeRecordRepository.save(cumulativeRecord);
    } else {
      // 새로운 누적 레코드 생성
      const newCumulativeRecord = this.cumulativeRecordRepository.create({
        userId,
        mealType,
        date,
        ...cumulative
      });
      await this.cumulativeRecordRepository.save(newCumulativeRecord);
    }
  }

  // 식단 삭제
  async deleteRecord(userId: string, date: string, mealType: number): Promise<void> {
    const dateObj = new Date(date);

    // 해당 날짜와 식사 유형에 맞는 레코드를 가져오기
    const recordsToDelete = await this.recordRepository.find({
      where: {
        userId: userId,
        firstRecordDate: Equal(dateObj),
        mealType: mealType,
      },
    });

    if (recordsToDelete.length === 0) {
      throw new NotFoundException(`해당 날짜나 식사 유형에 대한 기록이 없습니다.`);
    }

    // splitImage 레코드를 삭제
    for (const record of recordsToDelete) {
      await this.splitImageRepository.delete({
        imageId: record.imageId
      });
    }

    // Record 삭제 수행
    await this.recordRepository.remove(recordsToDelete);

    // 연관된 CumulativeRecord를 삭제
    const cumulativeRecordResult = await this.cumulativeRecordRepository.delete({
      userId: userId,
      date: Equal(dateObj),
      mealType: mealType,
    });

    if (cumulativeRecordResult.affected === 0) {
      console.log(`해당 날짜나 식사 유형에 대한 누적 기록이 없습니다.`);
    }
  }
}