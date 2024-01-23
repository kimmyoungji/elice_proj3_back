import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import {Image} from "./image.entity"
import { ImageRepository } from './image.repository';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image, User]), UserModule],
  providers: [ ImageService, ImageRepository],
  controllers: [ ImageController ]
})
export class ImageModule {
}
