import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {typeORMConfig} from './config/database/typeORMConfig'
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import * as dotenv from "dotenv";
import * as config from "config";
import { HealthInfo } from './user/entities/health-info.entity';
import { User } from './user/entities/user.entity';
import * as TypeOrmNamingStrategies from "typeorm-naming-strategies";

dotenv.config({path: __dirname + '/../.env'});
const dbConfig = config.get("db");
console.log(typeORMConfig)
@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    PassportModule.register({ session: true }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}