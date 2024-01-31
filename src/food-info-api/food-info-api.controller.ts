import { Controller, Get } from "@nestjs/common";
import { FoodInfoApiService } from "./food-info-api.service";
import { ApiTags } from "@nestjs/swagger";

@Controller("food-info-api")
@ApiTags("Food Info (외부 api) API")
export class FoodInfoApiController {
  constructor(private foodInfoApiservice: FoodInfoApiService) {}

  // 전국식품영양(음식) api
  @Get("/portalAPI")
  getDataPortalFood() {
    return this.foodInfoApiservice.getDataPortal();
  }

  // 전국식품영양(가공식품) api
  @Get("/portal-processAPI")
  getDataPortalProcessFood() {
    return this.foodInfoApiservice.getDataPortalProcess();
  }
}
