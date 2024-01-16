import { ApiProperty } from "@nestjs/swagger";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Record extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: "기록 id" })
  recordId: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  @ApiProperty({ description: "사용자 id" })
  userId: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  @ApiProperty({ description: "식단 구분" })
  mealType: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  @ApiProperty({ description: "음식/영양 정보 id" })
  foodInfoId: string;

  @Column({ type: "int", nullable: false })
  @ApiProperty({ description: "음식 수량" })
  foodCounts: number;

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
  dietaryFiber: number;

  @Column({ type: "int", nullable: true })
  @ApiProperty({ description: "총 칼로리" })
  totalCalories: number;

  @Column({ type: "date", nullable: true })
  @ApiProperty({ description: "첫 기록 날짜" })
  firstRecordDate: Date;

  @Column({ type: "timestamp with time zone", nullable: true })
  @ApiProperty({ description: "최근 수정 날짜" })
  updatedDate: Date;
}