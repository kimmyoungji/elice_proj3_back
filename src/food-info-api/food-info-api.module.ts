import { Module } from "@nestjs/common";
import { FoodInfoApiController } from "./food-info-api.controller";
import { FoodInfoApiService } from "./food-info-api.service";
import { FoodInfoAPIRepository } from "./food-info-api.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  // imports: [TypeOrmModule.forFeature([FoodInfoApi])],
  controllers: [FoodInfoApiController],
  providers: [FoodInfoApiService, FoodInfoAPIRepository],
})
export class FoodInfoApiModule {}
