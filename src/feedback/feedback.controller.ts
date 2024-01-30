import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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

  @Get("/save")
  async saveFeedbackData(@Query("feedbackId") feedbackId: string) {
    try {
      const saveResult =
        await this.feedbackService.saveFeedbackData(feedbackId);
      if (saveResult.affected === 0) {
        const exceptionObj = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "데이터 저장에 실패했습니다",
        };
        throw new HttpException(exceptionObj, HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      throw error;
    }
  }

  @Get("/")
  async getFeedbackData(
    @Req() request: any,
    @Query("startDate") startDate: Date,
    @Query("date") date: Date,
    @Query("page") page: number,
    @Query("feedbackId") feedbackId: string
  ) {
    try {
      const userId = "5c97c044-ea91-4e3e-bf76-eae150c317d1";
      // const userId = request.user.userId;
      if (startDate && date) {
        const data = await this.feedbackService.getFeedbackChatData(
          userId,
          startDate,
          date
        );
        if (data.length === 0) {
          throw new NotFoundException("데이터가 존재하지 않습니다");
        }
        return { data: data };
      } else if (page) {
        const data = await this.feedbackService.getFeedbackData(userId, page);
        if (data.length === 0) {
          throw new NotFoundException("데이터가 존재하지 않습니다");
        }
        return { data: data };
      } else if (feedbackId) {
        const { feedbackResultDto, healthInfoResult } =
          await this.feedbackService.getFeedbackDetailData(userId, feedbackId);
        if (!feedbackResultDto) {
          throw new NotFoundException("데이터가 존재하지 않습니다");
        }
        if (healthInfoResult) {
          return {
            ...feedbackResultDto,
            option: {
              goal: healthInfoResult[0].diet_goal,
              targetCalories: healthInfoResult[0].target_calories,
            },
          };
        } else {
          return {
            ...feedbackResultDto,
          };
        }
      } else {
        throw new BadRequestException("잘못된 요청입니다");
      }
    } catch (error) {
      throw error;
    }
  }

  @Delete("/")
  async deleteFeedbackData(
    @Query("feedbackId") feedbackId: string,
    @Res() response: any
  ) {
    try {
      const deleteResult =
        await this.feedbackService.deleteFeedbackData(feedbackId);
      if (!deleteResult) {
        const exceptionObj = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "데이터 삭제에 실패했습니다",
        };
        throw new HttpException(exceptionObj, HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      throw error;
    }
  }
}
