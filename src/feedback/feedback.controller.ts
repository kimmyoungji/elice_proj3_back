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
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("feedback")
@ApiTags("Feedback API")
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post("/")
  @ApiOperation({
    summary: "AI 피드백 요청하기",
    description: "AI가 유저의 질문에 맞는 피드백을 생성해서 응답한다.",
  })
  @ApiBody({ type: ResponseDataDto })
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
  @ApiOperation({
    summary: "AI 피드백 저장하기",
    description: "유저가 희망하는 AI 피드백을 저장한다.",
  })
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
  @ApiOperation({
    summary: "피드백 및 대화내용 조회하기",
    description:
      "startDate&date: 7일치의 대화를 조회한다. page: 저장한 모든 피드백을 5개씩 조회한다. feedbackId: 상세한 AI 피드백을 조회한다.",
  })
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
        return { data: data };
      } else if (page) {
        const data = await this.feedbackService.getFeedbackData(userId, page);
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
  @ApiOperation({
    summary: "피드백 삭제하기",
    description: "AI 피드백을 삭제한다.",
  })
  async deleteFeedbackData(
    @Query("feedbackId") feedbackId: string,
    @Res() response: any
  ) {
    try {
      const deleteResult =
        await this.feedbackService.deleteFeedbackData(feedbackId);
      console.log(deleteResult);
      if (deleteResult.affected === 0) {
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
