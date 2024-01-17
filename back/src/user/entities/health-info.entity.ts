import { Entity, Column, PrimaryColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsInt, IsOptional, IsString, IsEnum, IsDate } from 'class-validator';
import { User } from './user.entity';
import { ActivityAmount, DietGoal } from '../utils/health-info.enums'

@Entity()
export class HealthInfo {

    @PrimaryColumn({ type: 'uuid'})
    @IsString()
    @IsNotEmpty()
    healthInfoId: string;

    @Column({ type: 'int' })
    @IsInt()
    @IsNotEmpty()
    weight: number;

    @Column({ type: 'int'})
    @IsInt()
    @IsNotEmpty()
    height: number;

    @Column({ type: 'int'})
    @IsInt()
    @IsNotEmpty()
    targetWeight: number;

    @Column({ type: 'enum', enum: DietGoal })
    @IsEnum(DietGoal)
    @IsNotEmpty()
    goal: DietGoal;

    @Column({ type: 'enum', enum: ActivityAmount })
    @IsEnum(ActivityAmount)
    @IsNotEmpty()
    activityAmount: ActivityAmount;

    @Column({ type: 'int' })
    @IsInt()
    @IsNotEmpty()
    targetCalories: number;

    @Column({ type: 'int', array: true })
    @IsInt({ each: true })
    @IsNotEmpty()
    recommendIntake: number[];

    @Column({type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
    @UpdateDateColumn()
    @IsDate()
    updatedDate: Date;

    @OneToOne(() => User, user => user.healthInfo)
    user: User;
}