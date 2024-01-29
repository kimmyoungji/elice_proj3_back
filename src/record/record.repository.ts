import {
  Equal,
  LessThanOrEqual,
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

@Injectable()
export class RecordRepository extends Repository<Record> {
  constructor(
    @InjectRepository(Record) private recordRepository: Repository<Record>,
    @InjectRepository(FoodInfo) private foodInfoRepository: Repository<FoodInfo>,
    @InjectRepository(CumulativeRecord) private cumulativeRecordRepository: Repository<CumulativeRecord>,
    @InjectRepository(Image) private imageRecordRepository: Repository<Image>,
    @InjectRepository(SplitImage) private splitImageRepository: Repository<SplitImage>,
    @InjectRepository(HealthInfo) private healthInfoRepository: Repository<HealthInfo>
  ) {
    super(
      recordRepository.target,
      recordRepository.manager,
      recordRepository.queryRunner
    );
  }

  async findByDate(userId: string, date: string): Promise<any> {
    const dateObj = new Date(date);
    const records = await this.recordRepository.find({
      where: {
        firstRecordDate: Equal(dateObj),
      },
    });
  
    if (!records.length) {
      throw new NotFoundException(`해당 날짜에 대한 기록을 찾을 수 없습니다: ${date}`);
    }

    // 사용자의 건강 정보를 조회
    const healthInfo = await this.healthInfoRepository.findOneBy({ 
      userId: userId,
      updatedDate: LessThanOrEqual(dateObj)
    });
    if (!healthInfo) {
      throw new NotFoundException(`건강 정보를 찾을 수 없습니다: 사용자 ID ${userId}`);
    }
  
    // 식사 기록 비동기적으로 조회
    const mealAccumulator = {};
  
    for (const record of records) {
      const foodInfo = await this.foodInfoRepository.findOneBy({
        foodInfoId: record.foodInfoId,
      });
  
      if (!foodInfo) {
        throw new NotFoundException(`음식 정보를 찾을 수 없습니다: ID ${record.foodInfoId}`);
      }
  
      // splitImageRepository에서 XY 좌표 정보를 조회
      const splitImageRecord = await this.splitImageRepository.findOneBy({
        imageId: record.imageId,
      });
  
      // imageRecordRepository에서 이미지 URL을 조회
      const imageRecord = await this.imageRecordRepository.findOneBy({
        imageId: record.imageId,
      });
  
      const mealType = record.mealType;
      if (!mealAccumulator[mealType]) {
        mealAccumulator[mealType as number] = { foods: [], totalCalories: 0, totalNutrient: {
          carbohydrates: 0,
          proteins: 0,
          fats: 0,
          dietaryFiber: 0,
        }, 
        imgUrl: imageRecord ? imageRecord.foodImageUrl : undefined,
        targetCalories: healthInfo.targetCalories,
        recommendNutrient: {
          carbohydrates: healthInfo.recommendIntake[0],
          proteins: healthInfo.recommendIntake[1],
          fats: healthInfo.recommendIntake[2],
          dietaryFiber: healthInfo.recommendIntake[3],
        },
      }
    }
  
    const food = {
      foodInfoId: record.foodInfoId,
      recordId: record.recordId,
      foodName: foodInfo.foodName,
      counts: record.foodCounts,
      XYCoordinate: splitImageRecord
        ? [
            splitImageRecord.xCoordinate,
            splitImageRecord.yCoordinate,
            splitImageRecord.height,
            splitImageRecord.width,
          ]
        : [],
    };
  
    // 영양소 계산 로직을 추가
    mealAccumulator[mealType].totalCalories += record.totalCalories;
    mealAccumulator[mealType].totalNutrient.carbohydrates += record.carbohydrates;
    mealAccumulator[mealType].totalNutrient.proteins += record.proteins;
    mealAccumulator[mealType].totalNutrient.fats += record.fats;
    mealAccumulator[mealType].totalNutrient.dietaryFiber += record.dietaryFiber;

    mealAccumulator[mealType].foods.push(food);
  }

  // 최종 응답 데이터를 전달
  const response = {
    ...mealAccumulator
  };

  return response;
}

  // 식사 기록 생성
  async createRecord(createRecordDto: CreateRecordDto): Promise<Record[]> {
    const { userId, mealType, imgUrl, foods } = createRecordDto;
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
        foodName: food.foodName,
      });

      if (!foodInfo) {
        throw new NotFoundException(
          `음식 정보를 찾을 수 없습니다: ${food.foodName}`
        );
      }

      const newRecord = this.recordRepository.create({
        userId: userId,
        mealType: mealType,
        foodInfoId: food.foodInfoId,
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
      newCumulativeRecord.imageId = record.imageId; //형식 바꿔주셔야 함
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
  async updateRecord(date: string, mealType: number, updateRecordDto: UpdateRecordDto): Promise<any> {
    const recordDate = new Date(date);
    const { userId, foods } = updateRecordDto;
    const records: Record[] = [];

    let cumulativeCarbohydrates = 0;
    let cumulativeProteins = 0;
    let cumulativeFats = 0;
    let cumulativeDietaryFiber = 0;
    let cumulativeTotalCalories = 0;
  
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
      const existingRecord = existingRecords.find(record => record.foodInfoId == food.foodInfoId);
      console.log("existingRecord :", existingRecord)
      const foodInfo = await this.foodInfoRepository.findOneBy({
        foodInfoId: food.foodInfoId,
      });

    if (existingRecord) {
      // 기존 레코드 업데이트
      await this.recordRepository.update({ recordId: existingRecord.recordId }, {
        foodInfoId: food.foodInfoId,
        foodCounts: food.counts,
        imageId: imageRecord.imageId,
        carbohydrates: foodInfo.carbohydrates * food.counts,
        proteins: foodInfo.proteins * food.counts,
        fats: foodInfo.fats * food.counts,
        dietaryFiber: foodInfo.dietaryFiber * food.counts,
        totalCalories: foodInfo.calories * food.counts,
        updatedDate: new Date()
      });
      
      updatedFoodIds.add(food.foodInfoId);
      
      cumulativeCarbohydrates += existingRecord.totalCalories;
      cumulativeProteins += existingRecord.proteins;
      cumulativeFats += existingRecord.fats;
      cumulativeDietaryFiber += existingRecord.dietaryFiber;
      cumulativeTotalCalories += existingRecord.totalCalories;
      // records.push(existingRecord);

      await this.createOrUpdateCumulativeRecord(
        existingRecord,
        cumulativeTotalCalories,
        cumulativeCarbohydrates,
        cumulativeProteins,
        cumulativeFats,
        cumulativeDietaryFiber
      )

      // split_image 테이블에서 해당 imageId를 가진 레코드를 찾아 정보를 업데이트
      const splitImageRecord = await this.splitImageRepository.findOneBy({
        imageId: existingRecord.imageId,
      });

      if (splitImageRecord) {
        // 전달받은 XY 좌표 정보로 split_image 레코드를 업데이트
        splitImageRecord.xCoordinate = food.XYCoordinate[0];
        splitImageRecord.yCoordinate = food.XYCoordinate[1];
        splitImageRecord.width = food.XYCoordinate[2];
        splitImageRecord.height = food.XYCoordinate[3];
        await this.splitImageRepository.save(splitImageRecord);
    }
      } else if (!existingRecord.recordId){
        // createRecord 메소드를 사용하여 새로운 레코드 생성
        await this.createRecord({ userId, mealType, foods });
      }
    }
  
    // 있다가 없어진 데이터 삭제
    const recordsToDelete = existingRecords.filter(record => !updatedFoodIds.has(record.foodInfoId));
    for (const record of recordsToDelete) {
      // deleteRecord 메소드를 사용하여 레코드 삭제
      await this.deleteRecord(String(record.firstRecordDate), record.mealType);
    }
  }

  // 식단 삭제
  async deleteRecord(date: string, mealType: number): Promise<void> {
    const dateObj = new Date(date);

    // Record 삭제
    const recordResult = await this.recordRepository.delete({
      firstRecordDate: Equal(dateObj),
      mealType: mealType,
    });

    if (recordResult.affected === 0) {
      throw new NotFoundException(
        `해당 날짜나 식사 유형에 대한 기록이 없습니다.`
      );
    }

    // 연관된 CumulativeRecord 삭제
    const cumulativeRecordResult = await this.cumulativeRecordRepository.delete(
      {
        date: Equal(dateObj),
        mealType: mealType,
      }
    );

    if (cumulativeRecordResult.affected === 0) {
      console.log(`해당 날짜나 식사 유형에 대한 누적 기록이 없습니다.`);
    }
  }
}
