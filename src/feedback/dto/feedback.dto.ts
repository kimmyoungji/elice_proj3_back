import { Exclude, Expose, Transform } from "class-transformer";
import { IsDate, IsIn, IsNotEmpty, IsString, IsUUID } from "class-validator";

const QUESTION_TYPES = ["목표추천", "식단추천", "식단평가"];

export class ResponseDataDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(QUESTION_TYPES)
  questionType: string;

  @IsNotEmpty()
  @IsString()
  question: string;
}

@Exclude()
export class MakeFeedbackDataDto {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  feedback: string;

  @Expose()
  @IsNotEmpty()
  @IsDate()
  feedbackDate: Date;

  @Expose()
  @IsNotEmpty()
  @IsString()
  question: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  questionType: string;

  @Expose()
  @IsNotEmpty()
  saveYn: boolean;
}

@Exclude()
export class GetFeedbackDataDto {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  feedbackId: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  feedback: string;

  @Expose()
  @IsNotEmpty()
  @IsDate()
  feedbackDate: Date;

  @Expose()
  @IsNotEmpty()
  @IsString()
  question: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  questionType: string;
}

@Exclude()
export class CheckFeedbackDataDto {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @Expose()
  @IsNotEmpty()
  @IsDate()
  feedbackDate: Date;

  @Expose()
  @IsNotEmpty()
  @IsString()
  question: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  questionType: string;
}
