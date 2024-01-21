import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from "config";
import { Record } from "src/record/record.entity";
import * as TypeOrmNamingStrategies from "typeorm-naming-strategies";

// const dbConfig = config.get("db");

// export const typeORMConfig: TypeOrmModuleOptions = {
//   type: dbConfig.type,
//   host: process.env.RDS_HOSTNAME || dbConfig.host,
//   port: process.env.RDS_PORT || dbConfig.post,
//   username: process.env.RDS_USERNAME || dbConfig.username,
//   password: process.env.RDS_PASSWORD || dbConfig.password,
//   database: process.env.RDS_DB_NAME || dbConfig.database,
//   entities: [Record],
//   synchronize: false,
// };

export const typeORMConfig : TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '0000',
  database: 'ggu',
  entities: [Record],
  synchronize: true,
  namingStrategy: new TypeOrmNamingStrategies.SnakeNamingStrategy()
}
// export const typeORMConfig: TypeOrmModuleOptions = {
//   type: "postgres", //dbConfig.type,
//   host: process.env.RDS_HOSTNAME, // || dbConfig.host,
//   port: Number(process.env.RDS_PORT), // || dbConfig.post,
//   username: process.env.RDS_USERNAME, // || dbConfig.username,
//   password: process.env.RDS_PASSWORD, // || dbConfig.password,
//   database: process.env.RDS_DB_NAME, // || dbConfig.database,
//   entities: [__dirname + "/../../**/*.entity.{js, ts}"],
//   synchronize: false,
// };
