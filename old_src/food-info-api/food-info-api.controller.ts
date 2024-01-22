import { Controller, Get } from "@nestjs/common";
import { FoodInfoApiService } from "./food-info-api.service";

@Controller("food-info-api")
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
