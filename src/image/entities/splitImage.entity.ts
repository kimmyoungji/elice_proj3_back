import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";
import { UpdateSplitImageDto } from "../dtos/UpdateSplitImage.dto";
import { CreateSplitImageDto } from "../dtos/CreateSplitImage.dto";

@Entity()
export class SplitImage {
  @PrimaryGeneratedColumn()
  splitImageId: number;

  @Column()
  imageId: number;

  @Column()
  foodName: string;

  @Column()
  xCoordinate: number;

  @Column()
  yCoordinate: number;

  @Column()
  width: number;

  @Column()
  height:number;

  @Column({type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP"})
  createdAt: Timestamp;

  mapCreateSplitImageDtoToEntity(splitImageDto: CreateSplitImageDto  ) {
    const splitImage = new SplitImage();
    splitImage.imageId = splitImageDto.imageId;
    splitImage.xCoordinate = splitImageDto.xCoordinate;
    splitImage.yCoordinate = splitImageDto.yCoordinate;
    splitImage.width = splitImageDto.width;
    splitImage.height = splitImageDto.height;
    return splitImage;
  }

  mapUpdateSplitImageDtoToEntity(splitImageDto: UpdateSplitImageDto) {
    const splitImage = new SplitImage();
    splitImage.xCoordinate = splitImageDto.xCoordinate;
    splitImage.yCoordinate = splitImageDto.yCoordinate;
    splitImage.width = splitImageDto.width;
    splitImage.height = splitImageDto.height;
    return splitImage;
  }


}
