import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FoodInfo } from "./food-info.entity";
import { Repository } from "typeorm";
import { FoodInfoDto } from "./dtos/food-info.dto";

@Injectable()
export class FoodInfoRepository extends Repository<FoodInfo> {
  constructor(
    @InjectRepository(FoodInfo)
    private foodInfoRepository: Repository<FoodInfo>
  ) {
    super(
      foodInfoRepository.target,
      foodInfoRepository.manager,
      foodInfoRepository.queryRunner
    );
  }

  async getFoodList(keyword: string): Promise<FoodInfo[]> {
    const result = await this.createQueryBuilder("entity")
      .select("entity.foodName")
      .where("entity.food_name like :keyword", { keyword: `%${keyword}%` })
      .getMany();
    return result;
  }

  async getFoodInfo(foodName: string): Promise<FoodInfoDto> {
    const result = await this.createQueryBuilder("entity")
      .where("entity.food_name = :foodName", { foodName })
      .getOneOrFail();
    //getOneOrFail: 결과값 없을 경우 EntityNotFoundError 던짐
    return result;
  }
}
