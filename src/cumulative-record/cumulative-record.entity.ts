import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty({ description: "누적 기록 id" })
  cumulative_record_id: string;

  // Record module 합칠 때
  // @JoinColumn()
  // @ApiProperty({ description: "기록 id" })
  // @OneToMany(() => Record, (record) => record.record_id, { cascade: true })
  // record_ids: Record[];

  // Record module과 취합 전 test용
  @Column()
  @ApiProperty({ description: "기록 id" })
  record_ids: string[];

  @Column()
  @ApiProperty({ description: "유저 id" })
  user_id: string;

  @Column()
  @ApiProperty({ description: "기록한 식사 종류" })
  meal_type: string;

  @Column({ default: 0 })
  @ApiProperty({ description: "식사별 섭취한 총 칼로리" })
  meal_total_calories: number;

  @Column()
  @ApiProperty({ description: "날짜" })
  date: Date;

  @Column({ default: 0 })
  @ApiProperty({ description: "섭취한 탄수화물" })
  carbohydrates: number;

  @Column({ default: 0 })
  @ApiProperty({ description: "섭취한 단백질" })
  proteins: number;

  @Column({ default: 0 })
  @ApiProperty({ description: "섭취한 지방" })
  fats: number;

  @Column({ default: 0 })
  @ApiProperty({ description: "섭취한 식이섬유" })
  dietary_fiber: number;
}
