import { Injectable } from "@nestjs/common";
import { FoodInfo } from "./food-info.entity";
import { EntityManager } from "typeorm";
import { FoodInfoDto } from "./dto/food-info.dto";

@Injectable()
export class FoodInfoRepository {
  async getFoodList(
    keyword: string,
    manager: EntityManager
  ): Promise<FoodInfo[]> {
    const result = await manager
      .createQueryBuilder(FoodInfo, "entity")
      .select(["entity.foodInfoId", "entity.foodName"])
      .where("REPLACE(entity.food_name, ' ', '') like :keyword", {
        keyword: `%${keyword}%`,
      })
      .orderBy("entity.food_name", "ASC")
      .take(10)
      .getMany();
    return result;
  }

  async getFoodNextList(
    keyword: string,
    lastFoodId: string,
    manager: EntityManager
  ): Promise<FoodInfo[]> {
    const result = await manager
      .createQueryBuilder(FoodInfo, "entity")
      .select(["entity.foodInfoId", "entity.foodName"])
      .where("REPLACE(entity.food_name, ' ', '') like :keyword", {
        keyword: `%${keyword}%`,
      })
      .andWhere("entity.food_info_id > :lastFoodId", { lastFoodId })
      .orderBy("entity.food_info_id", "ASC")
      .take(10)
      .getMany();
    return result;
  }

  async getFoodInfo(
    foodName: string,
    manager: EntityManager
  ): Promise<FoodInfoDto> {
    const result = await manager
      .createQueryBuilder(FoodInfo, "entity")
      .where("REPLACE(entity.food_name, ' ', '') like :foodName", {
        foodName: `%${foodName}%`,
      })
      .getOneOrFail();
    //getOneOrFail: 결과값 없을 경우 EntityNotFoundError 던짐
    return result;
  }

  async getFoodInfoById(
    foodInfoId: string,
    manager: EntityManager
  ): Promise<FoodInfoDto> {
    const result = await manager
      .createQueryBuilder(FoodInfo, "entity")
      .where("entity.food_info_id = :foodInfoId", { foodInfoId })
      .getOneOrFail();
    //getOneOrFail: 결과값 없을 경우 EntityNotFoundError 던짐
    return result;
  }
}
