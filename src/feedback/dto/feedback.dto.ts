import { Exclude, Expose } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Timestamp } from "typeorm";

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
  feedbackDate: Timestamp;

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
  feedbackDate: Timestamp;

  @Expose()
  @IsNotEmpty()
  @IsString()
  question: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  questionType: string;
}
