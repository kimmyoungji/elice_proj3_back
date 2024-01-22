import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { CumulativeRecordModule } from "./cumulative-record/cumulative-record.module";
import { typeORMConfig } from "./config/database/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecordModule } from "./record/record.module";
import { FoodInfo } from "./food-info-api/food-info-api.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    CumulativeRecordModule,
    RecordModule,
    FoodInfo
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
