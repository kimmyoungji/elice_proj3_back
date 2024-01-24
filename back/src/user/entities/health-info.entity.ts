import { Entity, Column, PrimaryColumn, UpdateDateColumn, OneToOne, JoinColumn, DeleteDateColumn, Timestamp, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsInt, IsString, IsDate } from 'class-validator';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserAndHealthInfoDto } from '../dto/UpdateUserAndHealthInfo.dto';
import { ActivityAmount, DietGoal } from '../utils/health-info.enums';

@Entity()
export class HealthInfo {

    constructor(){
        this.healthInfoId = uuidv4();
    }

    @PrimaryColumn({ type: 'uuid'})
    @IsString()
    @IsNotEmpty()
    healthInfoId: string;

    @Column({ type: 'int', nullable: true})
    @IsInt()
    weight: number;

    @Column({ type: 'int', nullable: true})
    @IsInt()
    height: number;

    @Column({ type: 'int', nullable: true})
    @IsInt()
    targetWeight: number;

    @Column({ type: 'enum', name: "diet_goal", enum: DietGoal,  nullable: true })
    goal: DietGoal; // Diet_goal

    @Column({ type: 'enum', name:'activity_amount', enum: ActivityAmount, nullable: true })
    activityAmount: ActivityAmount;

    @Column({ type: 'int', nullable: true})
    @IsInt()
    targetCalories: number;

    @Column({ type: 'int', array: true, nullable: true })
    @IsInt({ each: true })
    recommendIntake: number[];

    @Column({type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
    @UpdateDateColumn()
    @IsDate()
    updatedDate: Timestamp;

    @Column({ type: 'timestamp with time zone', nullable: true })
    @DeleteDateColumn({name: 'deletedat'})
    deletedat: Timestamp;

    @ManyToOne(() => User, user => user.healthInfo)
    @JoinColumn({ name: 'user_id' })
    user: User;

    public mapHealthInfoDto(dto: UpdateUserAndHealthInfoDto){
        const healthInfo = new HealthInfo();
        healthInfo.weight = dto.weight;
        healthInfo.height = dto.height;
        healthInfo.targetWeight = dto.targetWeight;
        healthInfo.goal = dto.goal;
        healthInfo.activityAmount = dto.activityAmount;
        healthInfo.targetCalories = dto.targetCalories;
        healthInfo.recommendIntake = dto.recommendIntake;
        delete healthInfo.healthInfoId;
        return healthInfo;
    }
}