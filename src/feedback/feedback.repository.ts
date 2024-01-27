import { Feedback } from "./feedback.entity";
import { EntityManager } from "typeorm";
import {
  CheckFeedbackDataDto,
  GetFeedbackDataDto,
  MakeFeedbackDataDto,
} from "./dto/feedback.dto";

export class FeedbackRepository {
  async saveFeedBack(
    feedbackData: MakeFeedbackDataDto,
    manager: EntityManager
  ): Promise<void> {
    try {
      await manager
        .createQueryBuilder(Feedback, "feedback")
        .insert()
        .into(Feedback)
        .values(feedbackData)
        .execute();
    } catch (error) {
      throw error;
    }
  }

  async checkFeedBack(
    checkfeedbackData: CheckFeedbackDataDto,
    manager: EntityManager
  ) {
    const { userId, question, questionType, feedbackDate } = checkfeedbackData;
    return await manager
      .createQueryBuilder(Feedback, "feedback")
      .select("feedback.feedback")
      .where("feedback.user_id =:userId", { userId })
      .where("feedback.feedback_date =:feedbackDate", {
        feedbackDate,
      })
      .andWhere("feedback.questionType = :questionType", { questionType })
      .andWhere("feedback.question =:question", { question })
      .getOne();
  }

  async getFeedbackData(
    userId: string,
    date: Date,
    manager: EntityManager
  ): Promise<GetFeedbackDataDto[]> {
    return await manager
      .createQueryBuilder(Feedback, "feedback")
      .where("feedback.user_id =:userId", { userId })
      .andWhere("feedback.feedback_date =:date", { date })
      .getMany();
  }

  async getFeedbackDetailData(
    feedbackId: string,
    manager: EntityManager
  ): Promise<GetFeedbackDataDto> {
    return await manager
      .createQueryBuilder(Feedback, "feedback")
      .where("feedback_id =:feedbackId", { feedbackId })
      .getOne();
  }

  async deleteFeedbackData(
    feedbackId: string,
    manager: EntityManager
  ): Promise<void> {
    try {
      await manager
        .createQueryBuilder(Feedback, "feedback")
        .delete()
        .from(Feedback)
        .where("feedback_id =:feedbackId", { feedbackId })
        .execute();
    } catch (error) {
      throw error;
    }
  }
}
