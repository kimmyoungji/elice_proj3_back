import {
  FoodInfoAPIRepository,
} from "./food-info-api.repository";
import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import axios from "axios";

@Injectable()
export class FoodInfoApiService {
  private startIdx = 1;
  constructor(
    private foodInfoAPIRepository: FoodInfoAPIRepository
  ) {}

  // async getDataNara(): Promise<string> {
  //   const keyId = process.env.NARA_SERVICE_KEY;
  //   const serviceId = process.env.NARA_SERVICE_ID;
  //   const dataType = "json";
  //   let endIdx = this.startIdx + 999;
  //   console.log("Range", this.startIdx, endIdx);
  //   const url = `http://openapi.foodsafetykorea.go.kr/api/${keyId}/${serviceId}/${dataType}/${this.startIdx}/${endIdx}`;

  //   const res = await axios.get(url);
  //   console.log('식품안전나라 데이터', res.data)
  //   const data = res.data.I2790.row;
  //   console.log(data);
  //   const count = endIdx - this.startIdx + 1;
  //   const result = this.foodInfoNaraRepository.saveDataNara(data, count);
  //   if (result) {
  //     this.startIdx += 1000;
  //     return "성공";
  //   } else {
  //     return "실패";
  //   }
  // }

  async getDataPortal(): Promise<string> {
    const params = {
      serviceKey: process.env.PORTAL_SERVICE_KEY_COOKED,
      pageNo: this.startIdx,
      numOfRows: 200,
      type: "json",
    };
    const url =
      "http://api.data.go.kr/openapi/tn_pubr_public_nutri_food_info_api";
    console.log("page", this.startIdx);
    const res = await axios.get(url, { params: params });
    const data = res.data.response.body.items;
    const result = this.foodInfoAPIRepository.saveDataPortal(data);

    if (result) {
      this.startIdx += 1;
      return "성공!";
    } else {
      return "실패";
    }
  }

  // @Cron("30 */2 * * * *")
  // async handleCron() {
  //   try {
  //     await this.getDataPortalProcess();
  //   } catch {
  //     throw new Error();
  //   }
  // }

  async getDataPortalProcess(): Promise<string> {
    const params = {
      serviceKey: process.env.PORTAL_SERVICE_KEY_PROCESSED,
      pageNo: this.startIdx,
      numOfRows: 1000,
      type: "json",
    };
    const url =
      "http://api.data.go.kr/openapi/tn_pubr_public_nutri_process_info_api";
    console.log("page", this.startIdx);
    const res = await axios.get(url, { params: params });
    const data = res.data.response.body.items;
    const result = await this.foodInfoAPIRepository.saveDataPortalProcess(data);
    if (result) {
      // this.startIdx += 1;
      return "성공!";
    } else {
      return "실패";
    }
  }
}
