import { Controller, Get } from "@nestjs/common";
import { FoodInfoApiService } from "./food-info-api.service";
import { ApiProperty } from "@nestjs/swagger";

@Controller("food-info-api")
export class FoodInfoApiController {
  constructor(private foodInfoApiservice: FoodInfoApiService) {}

  // 식품안전나라 api
  @Get("/naraAPI")
  @ApiProperty( {description: "식품안전나라 api"} )
  getDataNara(): Promise<string> {
    return this.foodInfoApiservice.getDataNara();
  }

  // 전국식품영양(음식) api
  @Get("/portalAPI")
  @ApiProperty( {description: "전국식품영양(음식) api"} )
  getDataPortalFood() {
    return this.foodInfoApiservice.getDataPortal();
  }

  // 전국식품영양(가공식품) api
  @Get("/portal-processAPI")
  @ApiProperty( {description: "전국식품영양(가공식품) api"} )
  getDataPortalProcessFood() {
    return this.foodInfoApiservice.getDataPortalProcess();
  }
}
