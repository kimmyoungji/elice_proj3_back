import { Module } from "@nestjs/common";
import { FoodInfoController } from "./food-info.controller";
import { FoodInfoService } from "./food-info.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FoodInfo } from "src/food-info-api/food-info-api.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FoodInfo])],
  controllers: [FoodInfoController],
  providers: [FoodInfoService],
})
export class FoodInfoModule {}
