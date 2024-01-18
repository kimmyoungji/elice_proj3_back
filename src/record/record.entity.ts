import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum MealType {
  breakfast = 'breakfast',
  lunch = 'lunch',
  dinner = 'dinner',
  snack = 'snack'
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

  @Column({ type: "varchar", length: 50, nullable: false })
  foodInfoId: string;

  @Column({ type: "int", nullable: false })
  foodCounts: number;

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

  @Column({ type: "varchar", nullable: true })
  foodImage: string;

  @Column({ type: "date", nullable: true })
  firstRecordDate: Date;

  @Column({ type: "timestamp with time zone", nullable: true })
  updatedDate: Date;
}