import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  imageId: number;

  @Column()
  recordId: string;

  @Column()
  foodImage: string;
}
