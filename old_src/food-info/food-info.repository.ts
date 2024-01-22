import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FoodInfo } from "src/food-info-api/food-info-api.entity";
import { Repository } from "typeorm";

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

  async getFoodList(keyword: string) {
    const result = await this.createQueryBuilder("entity").where("").getMany();
    return result;
  }

  async getFoodInfo(foodName: string) {
    const result = await this.createQueryBuilder("entity").where("").getMany();
    return result;
  }
}
