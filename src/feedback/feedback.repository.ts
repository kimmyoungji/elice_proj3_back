import { Feedback } from "./feedback.entity";
import { EntityManager, Timestamp } from "typeorm";
import {
  CheckFeedbackDataDto,
  GetFeedbackDataDto,
  MakeFeedbackDataDto,
} from "./dto/feedback.dto";

export class FeedbackRepository {
  //extends Repository<Feedback>
  //   constructor(
  //     @InjectRepository(Feedback)
  //     private feedbackRepository: Repository<Feedback>
  //   ) {
  //     super(
  //       //extends Repository<Feedback> 이거 안쓰면 super 빨간줄
  //       feedbackRepository.target,
  //       feedbackRepository.manager,
  //       feedbackRepository.queryRunner
  //     );
  //   }

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
    try {
      const { userId, question, questionType, feedbackDate } =
        checkfeedbackData;
      const result = await manager
        .createQueryBuilder(Feedback, "feedback")
        .select("feedback.feedback")
        .where("feedback.user_id =:userId", { userId })
        .where("feedback.feedback_date =:feedbackDate", { feedbackDate })
        .andWhere("feedback.questionType =:questionType", { questionType })
        .andWhere("feedback.question =:question", { question })
        .getOne();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getFeedbackData(
    userId: string,
    date: Timestamp,
    manager: EntityManager
  ): Promise<GetFeedbackDataDto[]> {
    try {
      const result = await manager
        .createQueryBuilder(Feedback, "feedback")
        .where("feedback.user_id =:userId", { userId })
        .andWhere("feedback.feedback_date =:date", { date })
        .getMany();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getFeedbackDetailData(
    feedbackId: string,
    manager: EntityManager
  ): Promise<GetFeedbackDataDto> {
    try {
      const result = await manager
        .createQueryBuilder(Feedback, "feedback")
        .where("feedback_id =:feedbackId", { feedbackId })
        .getOne();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteFeedbackData(feedbackId: string, manager: EntityManager) {
    try {
      const result = await manager
        .createQueryBuilder(Feedback, "feedback")
        .delete()
        .from(Feedback)
        .where("feedback_id =:feedbackId", { feedbackId })
        .execute();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
