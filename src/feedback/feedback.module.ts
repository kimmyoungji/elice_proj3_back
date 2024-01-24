import { Module } from "@nestjs/common";
import { FeedbackController } from "./feedback.controller";
import { FeedbackService } from "./feedback.service";
import { FeedbackRepository } from "./feedback.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Feedback } from "./feedback.entity";

@Module({
  // imports: [TypeOrmModule.forFeature([Feedback])],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackRepository, FeedbackRepository],
})
export class FeedbackModule {}
