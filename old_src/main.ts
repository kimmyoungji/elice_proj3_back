import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "src/util/swagger";
import { ClassSerializerInterceptor } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(5001);
}
bootstrap();

