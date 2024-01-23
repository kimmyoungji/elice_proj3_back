import { Timestamp } from "typeorm";

export class CreateHealthInfoDto {
    weight: number;
    height: number;
    targetWeight: number;
    goal: number;
    activityAmount: number;
    targetCalories: number;
    recommendIntake: number[];
}