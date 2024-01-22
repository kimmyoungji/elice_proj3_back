import { uuid } from './../../node_modules/aws-sdk/clients/customerprofiles.d';
import { ApiProperty } from "@nestjs/swagger";
import { MealType } from 'src/record/record.enum';
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
  @ApiProperty({ description: "누적 기록 id", example: "1"})
  cumulative_record_id: string;

  // Record module 합칠 때
  // @JoinColumn()
  // @ApiProperty({ description: "기록 id" })
  // @OneToMany(() => Record, (record) => record.record_id, { cascade: true })
  // record_ids: Record[];

  // Record module과 취합 전 test용
  @Column({ type: "varchar", array: true, nullable: false })
  @ApiProperty({ description: "기록 id", example: ["A01", "A02"]})
  record_ids: string[];

  @Column()
  @ApiProperty({ description: "유저 id", example: "uuid" })
  user_id: string;

  @Column()
  @ApiProperty({ description: "기록한 식사 종류",example: "아침" })
  meal_type: string;

  @Column({ default: 0 })
  @ApiProperty({ description: "식사별 섭취한 총 칼로리", example: 1000 })
  meal_total_calories: number;

  @Column()
  @ApiProperty({ description: "날짜" , example: "2021-05-01"})
  date: Date;

  @Column({ default: 0 })
  @ApiProperty({ description: "섭취한 탄수화물", example: 100})
  carbohydrates: number;

  @Column({ default: 0 })
  @ApiProperty({ description: "섭취한 단백질", example: 100 })
  proteins: number;

  @Column({ default: 0 })
  @ApiProperty({ description: "섭취한 지방", example: 100})
  fats: number;

  @Column({ default: 0 })
  @ApiProperty({ description: "섭취한 식이섬유", example: 10 })
  dietary_fiber: number;
}
