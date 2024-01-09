import { ApiProperty } from "@nestjs/swagger";
// import { User } from "src/user/user.entity";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class CumulativeRecord extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "누적 기록 id" })
  record_id: string;

  // User module 합칠 때
  // @JoinColumn()
  // @ApiProperty({ description: "유저 id" })
  // @ManyToOne(() => User)
  // user: User;

  // 데이터 추가 컬럼 - test용
  @Column()
  user_id: string;

  @Column({ default: 0 })
  @ApiProperty({ description: "일별 섭취한 총 칼로리" })
  daily_total_calories: number;

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
