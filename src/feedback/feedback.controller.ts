import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { request } from "http";
import { Timestamp } from "typeorm";
import { MakeFeedbackDataDto } from "./dto/feedback.dto";

@Controller("feedback")
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post("/")
  async getFeedbacktoAI(
    @Req() request: any,
    @Query("date") date: Timestamp,
    @Body() makefeedbackDataDto: MakeFeedbackDataDto
  ) {
    const userId = "1c52fabf-4b73-45a8-9d0c-75c907bbb5ca";
    // const userId = request.user.userId;
    return await this.feedbackService.getFeedbacktoAI(
      userId,
      date,
      makefeedbackDataDto
    );
  }

  @Get("/")
  async getFeedbackData(
    @Req() request: any,
    @Query("date") date: Timestamp,
    @Query("feedbackId") feedbackId: string
  ) {
    const userId = "1c52fabf-4b73-45a8-9d0c-75c907bbb5ca";
    // const userId = request.user.userId;
    if (date) {
      return await this.feedbackService.getFeedbackData(userId, date);
    }

    if (feedbackId) {
      return await this.feedbackService.getFeedbackDetailData(
        userId,
        feedbackId
      );
    }
  }

  @Delete("/")
  async deleteFeedbackData(
    @Req() request: any,
    @Query("feedbackId") feedbackId: string
  ) {
    return await this.feedbackService.deleteFeedbackData(feedbackId);
  }
}
