import { Module } from "@nestjs/common";
import { CumulativeRecordController } from "./cumulative-record.controller";
import { CumulativeRecordService } from "./cumulative-record.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CumulativeRecord } from "./cumulative-record.entity";
import { CumulativeRecordRepository } from "./cumulative.repository";
import { HealthInfoRepository } from "src/user/health-info.repository";
import { ImageRepository } from "src/image/repositories/image.repository";

@Module({
  // imports: [TypeOrmModule.forFeature([CumulativeRecord])],
  controllers: [CumulativeRecordController],
  providers: [
    CumulativeRecordService,
    CumulativeRecordRepository,
    HealthInfoRepository,
    ImageRepository,
  ],
})
export class CumulativeRecordModule {}