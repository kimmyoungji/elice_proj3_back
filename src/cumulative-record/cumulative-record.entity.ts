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
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: "누적 기록 id" })
  cumulative_record_id: string;

  // User module 합칠 때
  // @JoinColumn()
  // @ApiProperty({ description: "유저 id" })
  // @ManyToOne(() => User)
  // user: User;

  // 데이터 추가 컬럼 - test용
  @Column()
  userId: string;

  @Column({ default: 0 })
  @ApiProperty({ description: "식단 구분" })
  mealType: string;

  @Column({ type: "int", nullable: true })
  @ApiProperty({ description: "이미지 id" })
  imageId: number;

  @Column({ default: 0 })
  @ApiProperty({ description: "일일 총 섭취 칼로리" })
  mealTotalCalories: number;

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
  dietaryFiber: number;

  // 여러 'record' ID를 저장하는 필드 추가
  // @Column({ type: "varchar", array: true, nullable: true })
  // @ApiProperty({ description: "관련된 식사 기록 ID 배열" })
  // recordIds: string;
}