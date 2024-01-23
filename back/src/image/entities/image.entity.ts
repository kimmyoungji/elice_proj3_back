import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { CreateImageDto } from "../dtos/CreateImage.dto";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  imageId: number;

  @Column()
  recordId: string;

  @Column()
  foodImage: string;

  mapCreateImageDtoToEntity(createImageDto: CreateImageDto) {
    const image = new Image();
    image.recordId = createImageDto.recordId;
    image.foodImage = createImageDto.image;
    return image;
  }
}
