import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { CumulativeRecordModule } from "./cumulative-record/cumulative-record.module";
import { typeORMConfig } from "./config/database/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecordModule } from "./record/record.module";
import { ImageModule } from "./image/image.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    CumulativeRecordModule,
    RecordModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
