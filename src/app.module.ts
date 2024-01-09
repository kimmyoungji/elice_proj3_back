import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { CumulativeRecordModule } from "./cumulative-record/cumulative-record.module";
import { typeORMConfig } from "./config/database/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    CumulativeRecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
