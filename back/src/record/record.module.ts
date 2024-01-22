import { RecordRepository } from "./record.repository";
import { Module } from "@nestjs/common";
import { RecordController } from "./record.controller";
import { RecordService } from "./record.service";
import { typeORMConfig } from "src/conifg/database/typorm.config.mj";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Record } from "./record.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  controllers: [RecordController],
  providers: [RecordService, RecordRepository ],
})
export class RecordModule {}
