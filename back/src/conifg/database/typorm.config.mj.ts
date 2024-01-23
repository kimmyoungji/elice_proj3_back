import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from "config";
import { HealthInfo } from "src/user/entities/health-info.entity";
import { User } from "src/user/entities/user.entity";
import * as TypeOrmNamingStrategies from "typeorm-naming-strategies";
import * as dotenv from "dotenv";
import { Food, Record } from "src/record/record.entity";
import { CumulativeRecord } from "src/cumulative-record/cumulative-record.entity";
import { FoodInfo } from "src/food-info/food-info.entity";
import { Image } from "src/image/entities/image.entity";
import { SplitImage } from "src/image/entities/splitImage.entity";

dotenv.config();
const dbConfig = config.get("db");

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.DB_HOSTNAME ,
  port: process.env.DB_PORT || dbConfig.post,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_NAME || dbConfig.database,
  entities: [ User, HealthInfo, Record, CumulativeRecord, FoodInfo, Image, SplitImage],
  synchronize: false,
  namingStrategy: new TypeOrmNamingStrategies.SnakeNamingStrategy(),
  logging: true,
  ssl: {
    rejectUnauthorized: false
  }
};
