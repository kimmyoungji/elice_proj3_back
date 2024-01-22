import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import {Image} from "./image.entity"
import { ImageRepository } from './image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ ImageService, ImageRepository ],
  controllers: [ ImageController ]
})
export class ImageModule {
}
