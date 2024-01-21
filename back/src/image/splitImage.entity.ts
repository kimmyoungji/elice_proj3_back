import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";

@Entity()
export class SplitImage {
  @PrimaryGeneratedColumn()
  splitImageId: number;

  @Column()
  imageId: string;

  @Column()
  x_coordinate: number;

  @Column()
  y_coordinate: number;

  @Column()
  createdAt: Timestamp;
}
