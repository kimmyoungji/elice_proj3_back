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

  async saveFeedBackYes(feedbackId: string, manager: EntityManager) {
    return await manager
      .createQueryBuilder(Feedback, "feedback")
      .update(Feedback)
      .set({ saveYn: true })
      .where("feedback.feedback_id = :feedbackId", { feedbackId })
      .execute();
  }

  async getFeedbackData(
    userId: string,
    page: number,
    manager: EntityManager
  ): Promise<GetFeedbackDataDto[]> {
    return await manager
      .createQueryBuilder(Feedback, "feedback")
      .where("feedback.user_id =:userId", { userId })
      .where("feedback.save_yn =:yn", { yn: true })
      .orderBy("feedback.feedback_date", "DESC")
      .take(5)
      .skip((page - 1) * 5)
      .getMany();
  }

  async getFeedbackChatData(
    userId: string,
    startDate: Date,
    date: Date,
    manager: EntityManager
  ): Promise<GetFeedbackDataDto[]> {
    return await manager
      .createQueryBuilder(Feedback, "feedback")
      .where("feedback.user_id =:userId", { userId })
      .andWhere("feedback.feedback_date >= :startDate", { startDate })
      .andWhere("feedback.feedback_date <= :date", { date })
      .orderBy("feedback.feedback_date", "ASC")
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

  async deleteFeedbackData(feedbackId: string, manager: EntityManager) {
    try {
      return await manager
        .createQueryBuilder(Feedback, "feedback")
        .softDelete()
        .from(Feedback)
        .where("feedback_id =:feedbackId", { feedbackId })
        .execute();
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
}
