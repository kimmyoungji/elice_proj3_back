import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from "config";
import { Record } from "src/record/record.entity";
import * as dotenv from "dotenv";
import * as TypeOrmNamingStrategies from "typeorm-naming-strategies";
import { FoodInfo } from "src/food-info-api/food-info-api.entity";
import { CumulativeRecord } from "src/cumulative-record/cumulative-record.entity";
import { Image } from "src/image/entities/image.entity";
import { SplitImage } from "src/image/entities/splitImage.entity";
import { HealthInfo } from "src/user/entities/health-info.entity";

dotenv.config({path: __dirname + '/../../../.env'});
// const dbConfig = config.get("db");

export const typeORMConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOSTNAME ,
  port: Number(process.env.DB_PORT), //|| dbConfig.port,
  username: process.env.DB_USERNAME, // || dbConfig.username,
  password: process.env.DB_PASSWORD, // || dbConfig.password,
  database: process.env.DB_NAME, // || dbConfig.database,
  entities: [ Record, FoodInfo, CumulativeRecord, Image, SplitImage ],
  synchronize: true,
  namingStrategy: new TypeOrmNamingStrategies.SnakeNamingStrategy(),
  logging: true,
  ssl: {
    rejectUnauthorized: false
  }
};

// export const typeORMConfig : TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: '0000',
//   database: 'ggu',
//   entities: [Record],
//   synchronize: true,
//   namingStrategy: new TypeOrmNamingStrategies.SnakeNamingStrategy()
// }