import { Module } from "@nestjs/common";
import { FeedbackController } from "./feedback.controller";
import { FeedbackService } from "./feedback.service";
import { FeedbackRepository } from "./feedback.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Feedback } from "./feedback.entity";
import { CumulativeRecordRepository } from "src/cumulative-record/cumulative.repository";
import { UserRepository } from "src/user/user.repository";

@Module({
  // imports: [TypeOrmModule.forFeature([Feedback])],
  controllers: [FeedbackController],
  providers: [
    FeedbackService,
    FeedbackRepository,
    FeedbackRepository,
    CumulativeRecordRepository,
    UserRepository,
  ],
})
export class FeedbackModule {}
