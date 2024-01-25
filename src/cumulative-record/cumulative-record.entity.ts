// import { User } from "src/user/user.entity";
import { MealType } from "src/record/record.enum";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class CumulativeRecord extends BaseEntity {
  @PrimaryGeneratedColumn()
  cumulativeRecordId: string;

  // Record module과 합칠 때
  @Column({ type: "text", array: true })
  // @JoinColumn()
  // @OneToOne(() => Image, (image) => image.imageIds, { cascade: true })
  imageId: string;

  // Record moduler과 합칠 때
  @Column()
  // @JoinColumn()
  // @ManyToOne(() => User, (user) => user.userId, { cascade: true })
  userId: string;

  @Column({ type: "enum", name: "meal_type", enum: MealType, nullable: true })
  mealType: MealType;

  @Column({ type: "int", default: 0 })
  mealTotalCalories: number;

  @Column()
  date: Date;

  @Column({ type: "int", default: 0 })
  carbohydrates: number;

  @Column({ type: "int", default: 0 })
  proteins: number;

  @Column({ type: "int", default: 0 })
  fats: number;

  @Column({ type: "int", default: 0 })
  dietaryFiber: number;
}
