import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './conifg/database/typorm.config.mj';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import * as dotenv from "dotenv";
import * as config from "config";
import { CumulativeRecordModule } from './cumulative-record/cumulative-record.module';
import { RecordModule } from './record/record.module';
import { FoodInfoApiModule } from "./food-info-api/food-info-api.module";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { FoodInfoModule } from "./food-info/food-info.module";

dotenv.config({path: __dirname + '/../.env'});
const dbConfig = config.get("db");
console.log(typeORMConfig)
@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    PassportModule.register({ session: true }),
    AuthModule,
    UserModule,
    CumulativeRecordModule,
    RecordModule,
    FoodInfoApiModule,
    ScheduleModule.forRoot(),
    FoodInfoModule,
  ],
})
export class AppModule {}