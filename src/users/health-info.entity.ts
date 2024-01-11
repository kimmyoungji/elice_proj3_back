import {
  Entity,
  PrimaryColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsOptional, IsString, IsEnum } from 'class-validator';
import { ActivityAmount, DietGoal } from './user.health-info.enums';

@Entity()
export class HealthInfo {
  @ApiProperty({ description: '사용자의 고유 ID' })
  @PrimaryColumn({ type: 'uuid'})
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ description: '사용자의 체중' })
  @Column({ type: 'int' })
  @IsNotEmpty()
  @IsInt()
  weight: number;

  @ApiProperty({ description: '사용자의 키' })
  @Column({ type: 'int' })
  @IsNotEmpty()
  @IsInt()
  height: number;

  @ApiProperty({ description: '사용자의 목표 체중' })
  @Column({ type: 'int' })
  @IsNotEmpty()
  @IsInt()
  target_weight: number;

  @ApiProperty({ description: '사용자의 목표' })
  @Column({ type: 'enum', enum: DietGoal })
  @IsNotEmpty()
  @IsEnum(DietGoal)
  goal: DietGoal;

  @ApiProperty({ description: '사용자의 활동량' })
  @Column({ type: 'enum', enum: ActivityAmount })
  @IsNotEmpty()
  @IsEnum(ActivityAmount)
  activity_amount: ActivityAmount;

  @ApiProperty({ description: '사용자의 목표 칼로리' })
  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsInt()
  target_calories: number;

  @ApiProperty({ description: '사용자의 권장 섭취량' })
  @Column({ type: 'int', nullable: true, array: true })
  @IsOptional()
  @IsInt()
  recommend_intake: number[];

  @ApiProperty({ description: '정보가 업데이트된 날짜' })
  @UpdateDateColumn()
  updated_date: Date;
}