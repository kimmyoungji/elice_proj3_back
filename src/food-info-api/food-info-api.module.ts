import { Module } from "@nestjs/common";
import { FoodInfoApiController } from "./food-info-api.controller";
import { FoodInfoApiService } from "./food-info-api.service";
import { FoodInfoAPIRepository } from "./food-info-api.repository";
import { FoodInfo } from "./food-info-api.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([FoodInfo])],
  controllers: [FoodInfoApiController],
  providers: [FoodInfoApiService, FoodInfoAPIRepository],
})
export class FoodInfoApiModule {}
