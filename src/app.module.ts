import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CumulativeRecordModule } from "./cumulative-record/cumulative-record.module";
import { typeORMConfig } from "./config/database/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FoodInfoApiModule } from "./food-info-api/food-info-api.module";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { FoodInfoModule } from "./food-info/food-info.module";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import * as dotenv from "dotenv";

dotenv.config();

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
    CumulativeRecordModule,
    FoodInfoApiModule,
    ScheduleModule.forRoot(),
    FoodInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
