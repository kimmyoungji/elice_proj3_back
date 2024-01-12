import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { CumulativeRecordModule } from "./cumulative-record/cumulative-record.module";
import { typeORMConfig } from "./config/database/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FoodInfoApiModule } from "./food-info-api/food-info-api.module";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { FoodInfoModule } from "./food-info/food-info.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.RDS_HOSTNAME,
      port: Number(process.env.RDS_PORT),
      username: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DB_NAME,
    }),
    UserModule,
    CumulativeRecordModule,
    FoodInfoApiModule,
    ScheduleModule.forRoot(),
    FoodInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
