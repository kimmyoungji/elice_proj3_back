import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { request } from "http";
import { ResponseDataDto } from "./dto/feedback.dto";

@Controller("feedback")
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post("/")
  async getFeedbacktoAI(
    @Req() request: any,
    @Query("date") date: Date,
    @Body() responseDataDto: ResponseDataDto
  ) {
    const userId = "5c97c044-ea91-4e3e-bf76-eae150c317d1";
    // const userId = request.user.userId;
    return await this.feedbackService.getFeedbacktoAI(
      userId,
      date,
      responseDataDto
    );
  }

  @Get("/")
  async getFeedbackData(
    @Req() request: any,
    @Query("date") date: Date,
    @Query("feedbackId") feedbackId: string,
    @Res() response: any
  ) {
    try {
      const userId = "5c97c044-ea91-4e3e-bf76-eae150c317d1";
      // const userId = request.user.userId;
      if (date) {
        const data = await this.feedbackService.getFeedbackData(userId, date);
        if (data.length === 0) {
          throw new NotFoundException("데이터가 존재하지 않습니다");
        }
        response.status(200).json({
          data: data,
        });
      }

      if (feedbackId) {
        const { feedbackResult, healthInfoResult } =
          await this.feedbackService.getFeedbackDetailData(userId, feedbackId);
        if (!feedbackResult) {
          throw new NotFoundException("데이터가 존재하지 않습니다");
        }
        if (healthInfoResult) {
          response.status(200).json({
            ...feedbackResult,
            option: {
              goal: healthInfoResult[0].diet_goal,
              targetCalories: healthInfoResult[0].target_calories,
            },
          });
        } else {
          response.status(200).json({
            ...feedbackResult,
          });
        }
      }
    } catch (error) {
      throw error;
    }
  }

  @Delete("/")
  async deleteFeedbackData(
    @Query("feedbackId") feedbackId: string,
    @Res() response: any
  ): Promise<void> {
    try {
      await this.feedbackService.deleteFeedbackData(feedbackId);
      response.status(200).json({ message: "피드백 삭제 성공" });
    } catch (error) {
      throw error;
    }
  }
}
