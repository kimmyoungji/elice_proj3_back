import { Module } from "@nestjs/common";
import { RecordController } from "./record.controller";
import { RecordService } from "./record.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Record } from "./record.entity";
import { RecordRepository } from "./record.repository";
import { FoodInfo } from "../food-info-api/food-info-api.entity";
import { CumulativeRecord } from "src/cumulative-record/cumulative-record.entity";
import { HealthInfo } from "src/user/entities/health-info.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Record, FoodInfo, CumulativeRecord, HealthInfo])],
  controllers: [RecordController],
  providers: [RecordService, RecordRepository],
})
export class RecordModule {}
