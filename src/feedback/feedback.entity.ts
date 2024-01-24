import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { IsNotEmpty, IsUUID } from "class-validator";
import { MakeFeedbackDataDto } from "./dto/feedback.dto";

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
  // @JoinColumn()
  // @ManyToOne(() => HealthInfo, (health) => health.goal, { cascade: true })
  questionType: string;

  @Column()
  feedback: string;

  @Column({ type: "timestamp with time zone" })
  @CreateDateColumn()
  feedbackDate: Timestamp;

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
}
