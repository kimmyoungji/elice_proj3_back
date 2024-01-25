import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ValueTransformer } from "typeorm";

export enum MealType {
  breakfast = '1',
  lunch = '2',
  dinner = '3',
  snack = '4'
}

export class Food {
  foodName: string
  counts: number
  foodImage: string
}

@Entity()
export class Record extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  recordId: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  userId: string;

  @Column({
    type: "enum",
    enum: MealType,
    nullable: false
  })
  mealType: MealType;

  @Column({ type: "varchar", nullable: false })
  foodInfoId: string;

  @Column({ type: "int", nullable: false })
  foodCounts: number;

  // @Column({ type: "json", nullable: true })
  // foods: Food[];

  @Column({ type: "int", nullable: true })
  carbohydrates: number;

  @Column({ type: "int", nullable: true })
  proteins: number;

  @Column({ type: "int", nullable: true })
  fats: number;

  @Column({ type: "int", nullable: true })
  dietaryFiber: number;

  @Column({ type: "int", nullable: true })
  totalCalories: number;

  @Column({ type: "int", nullable: true })
  imageId: number;

  @Column({ type: "date", nullable: true })
  firstRecordDate: Date;

  @Column({ type: "timestamp with time zone", nullable: true })
  updatedDate: Date;
}