import { Timestamp } from "typeorm";
import { ActivityAmount, DietGoal } from "../utils/health-info.enums";

export class UpdateHealthInfoDto {
    weight: number;
    height: number;
    targetWeight: number;
    goal: number;
    activityAmount: number;
    targetCalories: number;
    recommendIntake: number[];
}