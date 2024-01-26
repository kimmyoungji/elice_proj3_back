import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FoodNamePipe implements PipeTransform {
  transform(foodName: any, metadata: ArgumentMetadata) {
    // let checkFoodName = "";
    switch (foodName) {
      case "기타잡곡밥":
        foodName = "잡곡밥";
        break;
      case "콩밥":
        foodName = "콩밥_검정콩";
        break;
      case "참치김밥":
        foodName = "김밥_참치";
        break;
      case "오일소스스파게티":
        foodName = "스파게티_오일소스";
        break;
      case "크림소스스파게티":
        foodName = "스파게티_크림소스";
        break;
      case "배추된장국":
        foodName = "된장국_배추";
        break;
      case "치킨윙":
        foodName = "햄_스모크치킨윙";
        break;
      case "소세지볶음":
        foodName = "소시지볶음";
        break;
      default:
        foodName;
    }
    return foodName;
  }
}
