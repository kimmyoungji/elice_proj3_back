import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './conifg/database/typorm.config.mj';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import { CumulativeRecordModule } from './cumulative-record/cumulative-record.module';
import { RecordModule } from './record/record.module';
import { FoodInfoApiModule } from "./food-info-api/food-info-api.module";
import { ScheduleModule } from "@nestjs/schedule";
import { FoodInfoModule } from "./food-info/food-info.module";
import { ImageModule } from './image/image.module';
import { SplitImage } from './image/entities/splitImage.entity';

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
    ImageModule,
  ],
})
export class AppModule {}