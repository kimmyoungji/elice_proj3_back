import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { request } from "http";
import { Timestamp } from "typeorm";
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
    const userId = "5c97c044-ea91-4e3e-bf76-eae150c317d1";
    // const userId = request.user.userId;
    if (date) {
      const data = await this.feedbackService.getFeedbackData(userId, date);
      response.status(200).json({
        data: data,
      });
    }

    if (feedbackId) {
      const { feedbackResult, healthInfoResult } =
        await this.feedbackService.getFeedbackDetailData(userId, feedbackId);
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
  }

  @Delete("/")
  async deleteFeedbackData(
    @Query("feedbackId") feedbackId: string,
    @Res() response: any
  ) {
    try {
      await this.feedbackService.deleteFeedbackData(feedbackId);
      response.status(200).json({ message: "피드백 삭제 성공" });
    } catch (error) {
      throw error;
    }
  }
}
