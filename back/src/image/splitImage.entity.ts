import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";

@Entity()
export class SplitImage {
  @PrimaryGeneratedColumn()
  splitImageId: number;

  @Column()
  imageId: string;

  @Column()
  xCoordinate: number;

  @Column()
  yCoordinate: number;

  @Column()
  createdAt: Timestamp;
}
