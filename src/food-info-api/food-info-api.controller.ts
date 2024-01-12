import { Controller, Get } from "@nestjs/common";
import { FoodInfoApiService } from "./food-info-api.service";

@Controller("food-info-api")
export class FoodInfoApiController {
  constructor(private foodInfoApiservice: FoodInfoApiService) {}

  @Get("/naraAPI")
  getDataNara(): Promise<string> {
    return this.foodInfoApiservice.getDataNara();
  }

  @Get("/portalAPI")
  getDataPortalFood() {
    return this.foodInfoApiservice.getDataPortal();
  }

  @Get("/portal-processAPI")
  getDataPortalProcessFood() {
    return this.foodInfoApiservice.getDataPortalProcess();
  }
}
