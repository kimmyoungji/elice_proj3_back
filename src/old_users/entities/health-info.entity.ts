// import { UpdateUserDto } from './../dto/updateUser.dto';
// import { SignUpUserDto } from './../dto/signUpUpser.dto';
// import {
//   Entity,
//   PrimaryColumn,
//   Column,
//   UpdateDateColumn,
// } from 'typeorm';
// import { IsNotEmpty, IsInt, IsOptional, IsString, IsEnum } from 'class-validator';
// import { ActivityAmount, DietGoal } from '../old.user.health-info.enums';

// @Entity()
// export class HealthInfo {

//   @PrimaryColumn({ type: 'uuid'})
//   @IsNotEmpty()
//   userId: string;

//   @Column({ type: 'int' })
//   @IsNotEmpty()
//   @IsInt()
//   weight: number;

//   @Column({ type: 'int' })
//   @IsNotEmpty()
//   @IsInt()
//   height: number;

//   @Column({ type: 'int' })
//   @IsNotEmpty()
//   @IsInt()
//   targetWeight: number;

//   @Column({ type: 'enum', enum: DietGoal })
//   @IsNotEmpty()
//   @IsEnum(DietGoal)
//   goal: DietGoal;

//   @Column({ type: 'enum', enum: ActivityAmount })
//   @IsNotEmpty()
//   @IsEnum(ActivityAmount)
//   activityAmount: ActivityAmount;

//   @Column({ type: 'int', nullable: true })
//   @IsOptional()
//   @IsInt()
//   targetCalories: number;

//   @Column({ type: 'int', nullable: true, array: true })
//   @IsOptional()
//   @IsInt()
//   recommendIntake: number[];

//   @UpdateDateColumn()
//   updatedDate: Date;

//   public signUpUserDtotoEntity (signUpUserDto: SignUpUserDto) {
//     this.userId = signUpUserDto.userId;
//     this.weight = signUpUserDto.weight;
//     this.height = signUpUserDto.height;
//     this.goal = signUpUserDto.goal;
//     this.targetWeight = signUpUserDto.targetWeight;
//     this.targetCalories = signUpUserDto.targetCalories;
//     this.activityAmount = signUpUserDto.activity;
//   }

//   public updateUserDtoToEntity (updateUserDto: UpdateUserDto) {   
//     this.weight = updateUserDto.weight;
//     this.height = updateUserDto.height;
//     this.goal = updateUserDto.goal;
//     this.targetWeight = updateUserDto.targetWeight;
//     this.targetCalories = updateUserDto.targetCalories;
//     this.activityAmount = updateUserDto.activity;
//   }
// }