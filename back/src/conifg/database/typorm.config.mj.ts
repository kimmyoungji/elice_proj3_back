import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from "config";
import { HealthInfo } from "src/user/entities/health-info.entity";
import { User } from "src/user/entities/user.entity";
import * as TypeOrmNamingStrategies from "typeorm-naming-strategies";
import * as dotenv from "dotenv";

dotenv.config({path: __dirname + '/../../../.env'});
const dbConfig = config.get("db");

console.log(process.env.DB_HOSTNAME);
console.log(dbConfig);

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.DB_HOSTNAME ,
  port: process.env.DB_PORT || dbConfig.post,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_NAME || dbConfig.database,
  entities: [ User, HealthInfo ],
  synchronize: true,
  namingStrategy: new TypeOrmNamingStrategies.SnakeNamingStrategy(),
  logging: true,
  ssl: {
    rejectUnauthorized: false
  }
};
