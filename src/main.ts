import { ValidateByOptions } from './../node_modules/class-validator/types/decorator/common/ValidateBy.d';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './util/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from "dotenv";

dotenv.config({path: __dirname + '/../.env'});

async function bootstrap() {
  // app 생성
  const app = await NestFactory.create(AppModule);
  // swagger 설정
  setupSwagger(app);
  // api 프리픽스 설정
  app.setGlobalPrefix('api');
  // dto 유효성 검사 설정
  app.useGlobalPipes(new ValidationPipe({ 
    // whitelist: true, // dto에 없는 property는 거름, 200 OK
    // transform: true, // string -> number, 200 OK
    forbidNonWhitelisted: true, // dto에 없는 property는 거름, 400 에러
    transformOptions: {
      enableImplicitConversion: true, // string -> number, 암묵적 형변환 200 OK
    } 
  }));
  // app 실행
  await app.listen(5001);
}
bootstrap();
