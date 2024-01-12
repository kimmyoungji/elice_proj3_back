import { Module } from "@nestjs/common";
import { FoodInfoApiController } from "./food-info-api.controller";
import { FoodInfoApiService } from "./food-info-api.service";
import {
  FoodInfoNaraRepository,
  FoodInfoPortalRepository,
} from "./food-info-api.repository";
import { FoodInfoNara } from "./food-info-nara-api.entity";
import { FoodInfoPortal } from "./food-info-portal-api.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([FoodInfoNara]),
    TypeOrmModule.forFeature([FoodInfoPortal]),
  ],
  controllers: [FoodInfoApiController],
  providers: [
    FoodInfoApiService,
    FoodInfoNaraRepository,
    FoodInfoPortalRepository,
  ],
})
export class FoodInfoApiModule {}
