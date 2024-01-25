import { DataSource, Repository } from "typeorm";
import { FoodInfoApi } from "./food-info-api.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class FoodInfoAPIRepository extends Repository<FoodInfoApi> {
  constructor(@InjectRepository(FoodInfoApi) private dataSource: DataSource) {
    super(FoodInfoApi, dataSource.manager);
  }

  async saveDataPortal(data) {
    const count = data.length;
    let message = false;
    for (let i = 0; i < count; i++) {
      const food_info = data[i];
      const food_info_id = food_info["foodCd"];
      const food_name = food_info["foodNm"];
      const category = food_info["foodLv3Nm"];
      const main_code = food_info["foodLv4Cd"];
      const main_food_name = food_info["foodLv4Nm"];
      const brand =
        food_info["restNm"] !== "해당없음" ? food_info["restNm"] : null;
      const standard_capacity =
        food_info["nutConSrtrQua"] !== ""
          ? Math.round(
              parseFloat(food_info["nutConSrtrQua"].replace(/[^0-9]/g, "")) *
                100
            )
          : null;
      const total_capacity =
        food_info["foodSize"] !== ""
          ? Math.round(
              parseFloat(food_info["foodSize"].replace(/[^0-9]/g, "")) * 100
            )
          : null;
      const calories =
        food_info["enerc"] !== ""
          ? Math.round(parseFloat(food_info["enerc"]) * 100)
          : null;
      const carbohydrates =
        food_info["chocdf"] !== ""
          ? Math.round(parseFloat(food_info["chocdf"]) * 100)
          : null;
      const proteins =
        food_info["prot"] !== ""
          ? Math.round(parseFloat(food_info["prot"]) * 100)
          : null;
      const fats =
        food_info["fatce"] !== ""
          ? Math.round(parseFloat(food_info["fatce"]) * 100)
          : null;
      const dietary_fiber =
        food_info["fibtg"] !== ""
          ? Math.round(parseFloat(food_info["fibtg"]) * 100)
          : null;
      const created_date = food_info["crtYmd"];
      const updated_date = food_info["crtrYmd"];

      const result = this.create({
        food_info_id,
        food_name,
        category,
        main_code,
        main_food_name,
        brand,
        standard_capacity,
        total_capacity,
        calories,
        carbohydrates,
        proteins,
        fats,
        dietary_fiber,
        created_date,
        updated_date,
      });

      await this.save(result);
      message = true;
    }
    console.log("저장 완료");
    return message;
  }

  async saveDataPortalProcess(data) {
    const count = data.length;
    let message = false;
    for (let i = 0; i < count; i++) {
      const food_info = data[i];
      const food_info_id = food_info["foodCd"];
      const food_name = food_info["foodNm"];
      const category = food_info["foodLv3Nm"];
      const main_code = food_info["foodLv4Cd"];
      const main_food_name = food_info["foodLv4Nm"];
      const brand =
        food_info["mfrNm"] !== "해당없음" ? food_info["mfrNm"] : null;
      const standard_capacity =
        food_info["nutConSrtrQua"] !== ""
          ? Math.round(
              parseFloat(food_info["nutConSrtrQua"].replace(/[^0-9]/g, "")) *
                100
            )
          : null;
      const total_capacity =
        food_info["foodSize"] !== ""
          ? Math.round(
              parseFloat(food_info["foodSize"].replace(/[^0-9]/g, "")) * 100
            )
          : null;
      const calories =
        food_info["enerc"] !== ""
          ? Math.round(parseFloat(food_info["enerc"]) * 100)
          : null;
      const carbohydrates =
        food_info["chocdf"] !== ""
          ? Math.round(parseFloat(food_info["chocdf"]) * 100)
          : null;
      const proteins =
        food_info["prot"] !== ""
          ? Math.round(parseFloat(food_info["prot"]) * 100)
          : null;
      const fats =
        food_info["fatce"] !== ""
          ? Math.round(parseFloat(food_info["fatce"]) * 100)
          : null;
      const dietary_fiber =
        food_info["fibtg"] !== ""
          ? Math.round(parseFloat(food_info["fibtg"]) * 100)
          : null;
      const created_date = food_info["crtYmd"];
      const updated_date = food_info["crtrYmd"];

      const result = await this.create({
        food_info_id,
        food_name,
        category,
        main_code,
        main_food_name,
        brand,
        standard_capacity,
        total_capacity,
        calories,
        carbohydrates,
        proteins,
        fats,
        dietary_fiber,
        created_date,
        updated_date,
      });

      await this.save(result);
      message = true;
    }
    console.log("저장 완료");
    return message;
  }
}
