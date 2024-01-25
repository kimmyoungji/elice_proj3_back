import { Injectable } from "@nestjs/common";
import { FeedbackRepository } from "./feedback.repository";
import { DataSource, Or, Timestamp } from "typeorm";
import { Feedback } from "./feedback.entity";
import { GetFeedbackDataDto, ResponseDataDto } from "./dto/feedback.dto";
import { plainToInstance } from "class-transformer";
import { CumulativeRecordRepository } from "src/cumulative-record/cumulative.repository";
import { UserRepository } from "src/user/user.repository";

const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();

const openai = new OpenAI();

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
        // 추후 인터셉터로 빼기
        let questionDetail = "";
        switch (questionType) {
          case "식단평가":
            questionDetail = `내가 오늘 하루 동안 먹은 식단의 영양성분은 탄수화물 ${totalResult.carbohydrates}g, 단백질 ${totalResult.proteins}g, 지방 ${totalResult.fats}g, 식이섬유 ${totalResult.dietaryFiber}g이야. 내 식단의 영양성분 구성을 평가해줘.`;
          case "식단추천":
            questionDetail = `나의 현재 몸무게는 ${userInfo[0].weight}kg이고 나는 ${userInfo[0].targetWeight}kg까지 몸무게를 빼고싶어. 다이어트 하기에 좋은 식단을 추천해줘`;
          case "목표추천":
            questionDetail = `나의 현재 몸무게는 ${userInfo[0].weight}kg이고 나는 ${userInfo[0].targetWeight}kg까지 몸무게를 빼고싶어. 나의 식단 기록 목표를 추천해줘`;
        }

        const gender = (userInfo.gender = 1
          ? "남자야"
          : (userInfo.gender = 2 ? "여자야" : "사람이야"));
        const userInfoDetail = `유저는 키가 ${userInfo.height}cm이고 몸무게가 ${userInfo.weight}kg인 ${gender}`;

        // ChatGPT API 호출
        // const chatCompletion = await openai.chat.completions.create({
        //   messages: [
        //     {
        //       role: "system",
        //       content:
        //         "너는 영양사야. 식단 영양성분 구성을 알려주면 1일 권장 섭취량을 기준으로 식단을 평가 해줘",
        //     },
        //     {
        //       role: "assistant",
        //       content: userInfoDetail,
        //     },
        //     {
        //       role: "user",
        //       content: questionDetail,
        //     },
        //   ],
        //   model: "gpt-3.5-turbo",
        // });

        // const outputText = chatCompletion.choices[0].message.content;
        const outputText = "test111";
        const data = {
          userId,
          question,
          questionType,
          feedback: outputText,
          feedbackDate: date,
        };
        const feedbackData = new Feedback().makefeedbackDataDto(data);
        await this.feedBackRepository.saveFeedBack(
          feedbackData,
          queryRunner.manager
        );
        await queryRunner.commitTransaction();
        return outputText;
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async getFeedbackData(
    userId: string,
    date: Date
  ): Promise<GetFeedbackDataDto[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await this.feedBackRepository.getFeedbackData(
        userId,
        date,
        queryRunner.manager
      );
      await queryRunner.commitTransaction();
      return plainToInstance(GetFeedbackDataDto, result);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
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
        // health-info 테이블과 연결
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
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteFeedbackData(feedbackId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await this.feedBackRepository.deleteFeedbackData(
        feedbackId,
        queryRunner.manager
      );
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
