import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { IsNotEmpty, IsUUID } from "class-validator";
import { CheckFeedbackDataDto, MakeFeedbackDataDto } from "./dto/feedback.dto";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Feedback {
  constructor() {
    this.feedbackId = uuidv4();
  }

  @PrimaryColumn({ type: "uuid" })
  @IsUUID()
  @IsNotEmpty()
  feedbackId: string;

  @Column()
  @IsUUID()
  // @JoinColumn()
  // @ManyToOne(() => User, (user) => user.userId, { cascade: true })
  userId: string;

  @Column()
  question: string;

  @Column()
  questionType: string;

  @Column()
  feedback: string;

  @Column()
  feedbackDate: Date;

  @Column({ default: false })
  saveYn: boolean;

  public makefeedbackDataDto(
    makeFeedbackDataDto: MakeFeedbackDataDto
  ): Feedback {
    const { userId, feedback, feedbackDate, question, questionType } =
      makeFeedbackDataDto;
    const feedbackData = new Feedback();
    feedbackData.feedbackId = uuidv4();
    feedbackData.userId = userId;
    feedbackData.feedback = feedback;
    feedbackData.feedbackDate = feedbackDate;
    feedbackData.question = question;
    feedbackData.questionType = questionType;
    return feedbackData;
  }

  public checkfeedbackDataDto(
    checkFeedbackDataDto: CheckFeedbackDataDto
  ): Feedback {
    const { userId, feedbackDate, question, questionType } =
      checkFeedbackDataDto;
    const feedbackData = new Feedback();
    feedbackData.userId = userId;
    feedbackData.feedbackDate = feedbackDate;
    feedbackData.question = question;
    feedbackData.questionType = questionType;
    return feedbackData;
  }
}
