import { InjectRepository } from "@nestjs/typeorm";
import { Feedback } from "./feedback.entity";
import { EntityManager, Repository, Timestamp } from "typeorm";
import { GetFeedbackDataDto, MakeFeedbackDataDto } from "./dto/feedback.dto";

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
    await manager
      .createQueryBuilder(Feedback, "feedback")
      .insert()
      .into(Feedback)
      .values(feedbackData)
      .execute();
  }

  async getFeedbackData(
    userId: string,
    date: Timestamp,
    manager: EntityManager
  ): Promise<GetFeedbackDataDto[]> {
    const result = await manager
      .createQueryBuilder(Feedback, "feedback")
      .where("feedback.user_id =:userId", { userId })
      .andWhere("feedback.feedback_date =:date", { date })
      .getMany();
    return result;
  }

  async getFeedbackDetailData(
    feedbackId: string,
    manager: EntityManager
  ): Promise<GetFeedbackDataDto> {
    const result = await manager
      .createQueryBuilder(Feedback, "feedback")
      .where("feedback_id =:feedbackId", { feedbackId })
      .getOne();
    return result;
  }

  async deleteFeedbackData(feedbackId: string, manager: EntityManager) {
    console.log(feedbackId);
    try {
      const result = await manager
        .createQueryBuilder(Feedback, "feedback")
        .delete()
        .from(Feedback)
        .where("feedback_id = :feedbackId", { feedbackId })
        .execute();
      return result;
    } catch (err) {
      console.log("삭제 안됨");
    }
  }
}
