import { Injectable } from "@nestjs/common";
import { FeedbackRepository } from "./feedback.repository";
import { DataSource } from "typeorm";
import { Feedback } from "./feedback.entity";
import { GetFeedbackDataDto, ResponseDataDto } from "./dto/feedback.dto";
import { plainToInstance } from "class-transformer";
import { CumulativeRecordRepository } from "src/cumulative-record/cumulative.repository";
import { UserRepository } from "src/user/user.repository";
import { ChatgptApi } from "./utils/chatgpt-api";

@Injectable()
export class FeedbackService {
  constructor(
    private feedBackRepository: FeedbackRepository,
    private cumulativeRepository: CumulativeRecordRepository,
    private userRepository: UserRepository,
    private readonly dataSource: DataSource
  ) {}

  async getFeedbacktoAI(
    userId: string,
    date: Date,
    responseDataDto: ResponseDataDto
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { question, questionType } = responseDataDto;

      const checkdata = {
        userId,
        question,
        questionType,
        feedbackDate: date,
      };
      const feedbackData = new Feedback().checkfeedbackDataDto(checkdata);
      const checkResult = await this.feedBackRepository.checkFeedBack(
        feedbackData,
        queryRunner.manager
      );
      // 만약 동일 유저의 질문이 있다면, api 호출 x
      if (checkResult) {
        await queryRunner.commitTransaction();
        return checkResult.feedback;
      } else {
        // 만약 동일 유저의 질문이 없다면, api 호출
        const totalResult = await this.cumulativeRepository.getDateRecord(
          date,
          userId,
          queryRunner.manager
        );
        const userInfo = await this.userRepository.findUserInfosByUserId(
          userId,
          queryRunner.manager
        );
        // 추후 다른 파일로 빼기

        // ChatGPT API 호출
        // const outputText = await ChatgptApi(totalResult, userInfo, questionType);

        const outputText = "네 식단를 추천해드릴게요 어쩌구 저쩌구 ~";
        const data = {
          userId,
          question,
          questionType,
          feedback: outputText,
          feedbackDate: date,
          saveYn: false,
        };
        const feedbackData = new Feedback().makefeedbackDataDto(data);
        await this.feedBackRepository.saveFeedBack(
          feedbackData,
          queryRunner.manager
        );
        await queryRunner.commitTransaction();
        return outputText;
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async saveFeedbackData(feedbackId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.feedBackRepository.saveFeedBackYes(
        feedbackId,
        queryRunner.manager
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getFeedbackData(
    userId: string,
    page: number
  ): Promise<GetFeedbackDataDto[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await this.feedBackRepository.getFeedbackData(
        userId,
        page,
        queryRunner.manager
      );
      await queryRunner.commitTransaction();
      return plainToInstance(GetFeedbackDataDto, result);
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getFeedbackChatData(
    userId: string,
    startDate: Date,
    date: Date
  ): Promise<GetFeedbackDataDto[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await this.feedBackRepository.getFeedbackChatData(
        userId,
        startDate,
        date,
        queryRunner.manager
      );
      await queryRunner.commitTransaction();
      return plainToInstance(GetFeedbackDataDto, result);
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getFeedbackDetailData(userId: string, feedbackId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let feedbackResult = await this.feedBackRepository.getFeedbackDetailData(
        feedbackId,
        queryRunner.manager
      );
      feedbackResult = plainToInstance(GetFeedbackDataDto, feedbackResult);
      if (
        feedbackResult.questionType === "목표추천" ||
        (feedbackResult.questionType === "식단추천" &&
          feedbackResult.question === "내 목표에 맞게 추천받고 싶어")
      ) {
        const healthInfoResult =
          await this.userRepository.findUserInfosByUserId(
            userId,
            queryRunner.manager
          );
        await queryRunner.commitTransaction();
        return { feedbackResult, healthInfoResult };
      } else {
        await queryRunner.commitTransaction();
        return { feedbackResult, healthInfoResult: null };
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async deleteFeedbackData(feedbackId: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.feedBackRepository.deleteFeedbackData(
        feedbackId,
        queryRunner.manager
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
