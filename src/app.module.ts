import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { CumulativeRecordModule } from "./cumulative-record/cumulative-record.module";
import { typeORMConfig } from "./config/database/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FoodInfoApiModule } from "./food-info-api/food-info-api.module";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { FoodInfoModule } from "./food-info/food-info.module";
import * as dotenv from "dotenv";
import { UserModule } from "./user/user.module";
import { ImageModule } from "./image/image.module";
import { FeedbackModule } from "./feedback/feedback.module";
import { RecordModule } from "./record/record.module";
dotenv.config();
console.log(typeORMConfig);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeORMConfig),
    PassportModule.register({ session: true }),
    AuthModule,
    UserModule,
    RecordModule,
    CumulativeRecordModule,
    FoodInfoApiModule,
    ScheduleModule.forRoot(),
    FoodInfoModule,
    FeedbackModule,
    ImageModule,
  ],
})
export class AppModule {}
