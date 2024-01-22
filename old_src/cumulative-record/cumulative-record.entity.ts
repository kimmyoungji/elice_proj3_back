// import { User } from "src/user/user.entity";
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

  // Record module 합칠 때
  // @JoinColumn()
  // @OneToMany(() => Record, (record) => record.record_id, { cascade: true })
  // record_ids: Record[];

  // Record module과 취합 전 test용
  @Column({ type: "text", array: true })
  recordIds: string[];

  @Column()
  userId: string;

  @Column()
  mealType: string;

  @Column({ default: 0 })
  mealTotalCalories: number;

  @Column()
  date: Date;

  @Column({ default: 0 })
  carbohydrates: number;

  @Column({ default: 0 })
  proteins: number;

  @Column({ default: 0 })
  fats: number;

  @Column({ default: 0 })
  dietaryFiber: number;
}
