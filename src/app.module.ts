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
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import * as dotenv from "dotenv";
import * as config from "config";
import { UserModule } from "./user/user.module";
import { FeedbackModule } from "./feedback/feedback.module";

dotenv.config();
dotenv.config({ path: __dirname + "/../.env" });
const dbConfig = config.get("db");
console.log(typeORMConfig);
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(
      //typeORMConfig
      {
        type: "postgres", //dbConfig.type,
        host: process.env.DB_HOSTNAME, // || dbConfig.host,
        port: Number(process.env.DB_PORT), // || dbConfig.post,
        username: process.env.DB_USERNAME, // || dbConfig.username,
        password: process.env.DB_PASSWORD, // || dbConfig.password,
        database: process.env.DB_NAME, // || dbConfig.database,
        entities: [__dirname + "/../../**/*.entity.{js, ts}"],
        synchronize: false,
        namingStrategy: new SnakeNamingStrategy(),
        ssl: {
          rejectUnauthorized: false,
        },
      }
    ),
    PassportModule.register({ session: true }),
    AuthModule,
    UserModule,
    CumulativeRecordModule,
    FoodInfoApiModule,
    ScheduleModule.forRoot(),
    FoodInfoModule,
    FeedbackModule,
  ],
})
export class AppModule {}
