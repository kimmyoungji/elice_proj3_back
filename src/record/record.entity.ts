import { ApiProperty } from "@nestjs/swagger";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class Record extends BaseEntity {
  @PrimaryColumn('uuid')
  @ApiProperty({ description: "기록 id" })
  record_id: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  @ApiProperty({ description: "사용자 id" })
  user_id: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  @ApiProperty({ description: "식단 구분" })
  meal_type: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  @ApiProperty({ description: "음식/영양 정보 id" })
  food_info_id: string;

  @Column({ type: "int", nullable: false })
  @ApiProperty({ description: "음식 수량" })
  food_counts: number;

  @Column({ type: "int", nullable: true })
  @ApiProperty({ description: "탄수화물" })
  carbohydrates: number;

  @Column({ type: "int", nullable: true })
  @ApiProperty({ description: "단백질" })
  proteins: number;

  @Column({ type: "int", nullable: true })
  @ApiProperty({ description: "지방" })
  fats: number;

  @Column({ type: "int", nullable: true })
  @ApiProperty({ description: "식이섬유" })
  dietary_fiber: number;

  @Column({ type: "timestamp", nullable: true })
  @ApiProperty({ description: "첫 기록 날짜" })
  first_record_date: Date;

  @Column({ type: "timestamp", nullable: true })
  @ApiProperty({ description: "최근 수정 날짜" })
  updated_date: Date;
}