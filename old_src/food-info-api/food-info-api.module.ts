import { Module } from "@nestjs/common";
import { FoodInfoApiController } from "./food-info-api.controller";
import { FoodInfoApiService } from "./food-info-api.service";
import {
  FoodInfoNaraRepository,
  FoodInfoAPIRepository,
} from "./food-info-api.repository";
import { FoodInfoNara } from "./food-info-nara-api.entity";
import { FoodInfo } from "./food-info-api.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([FoodInfoNara]),
    TypeOrmModule.forFeature([FoodInfo]),
  ],
  controllers: [FoodInfoApiController],
  providers: [
    FoodInfoApiService,
    FoodInfoNaraRepository,
    FoodInfoAPIRepository,
  ],
})
export class FoodInfoApiModule {}
