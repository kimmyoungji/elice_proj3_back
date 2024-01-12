export interface MealTimeData {
    [key: string]: {
      food: {
        foodName: string;
        foodImage: string;
        XYCoordinate: number[];
      }[];
      totalCalories: number;
      totalNutrient: {
        carbohydrates: number;
        proteins: number;
        fat: number;
        dietaryFiber: number;
      };
      recommendNutrient: {
        carbohydrates: number;
        proteins: number;
        fat: number;
        dietaryFiber: number;
      };
      imgurl: string | undefined;
    };
  }
  



const mealTimeData : MealTimeData = {

    "아침" : {    
    
    food :[
      {
          foodName: "떡만둣국",
          foodImage: "Image1", 
          XYCoordinate:  [35.67, 146.02],
      },
      {
        foodName: "김치찌개",
        foodImage: "Image1", 
        XYCoordinate:  [35.67, 146.02],
    },
    {
        foodName: "오징어무침",
        foodImage: "Image1", 
        XYCoordinate:  [35.67, 146.02],
    },
],

    totalCalories: 1400,
    totalNutrient : {carbohydrates:  240 ,proteins: 80, fat: 25, dietaryFiber: 2 },
    recommendNutrient : {carbohydrates:  200 , proteins: 80, fat: 50, dietaryFiber: 4 },
    imgurl :  "/images/record_example.png"
},

    "점심" : {
        food :[
            {
                foodName: "감자떡",
                foodImage: "Image1", 
                XYCoordinate:  [35.67, 146.02],
            },
            {
              foodName: "고구마빵",
              foodImage: "Image1", 
              XYCoordinate:  [35.67, 146.02],
          },
          {
              foodName: "아이스크림",
              foodImage: "Image1", 
              XYCoordinate:  [35.67, 146.02],
          },
          {
              foodName: "약과",
              foodImage: "Image1", 
              XYCoordinate:  [35.67, 146.02],
          },
      ],
          totalCalories: 2500,
          totalNutrient : {carbohydrates:  240 ,proteins: 80, fat: 25, dietaryFiber: 2 },
          recommendNutrient : {carbohydrates:  200 , proteins: 80, fat: 50, dietaryFiber: 4 },
          imgurl : undefined
    },

    "저녁" : {
        food :[
            {
                foodName: "감자탕",
                foodImage: "Image1", 
                XYCoordinate:  [35.67, 146.02],
            },
            {
              foodName: "뚝배기",
              foodImage: "Image1", 
              XYCoordinate:  [35.67, 146.02],
          },
          {
              foodName: "비빔국수",
              foodImage: "Image1", 
              XYCoordinate:  [35.67, 146.02],
          },
          {
              foodName: "갈비탕",
              foodImage: "Image1", 
              XYCoordinate:  [35.67, 146.02],
          },

          {
            foodName: "어쩌구저쩌구",
            foodImage: "Image1", 
            XYCoordinate:  [35.67, 146.02],
        },

        {
            foodName: "올로로롤",
            foodImage: "Image1", 
            XYCoordinate:  [35.67, 146.02],
        },
        {
            foodName: "올로로롤",
            foodImage: "Image1", 
            XYCoordinate:  [35.67, 146.02],
        },
        {
            foodName: "올로로롤",
            foodImage: "Image1", 
            XYCoordinate:  [35.67, 146.02],
        },
        {
            foodName: "올로로롤",
            foodImage: "Image1", 
            XYCoordinate:  [35.67, 146.02],
        },
        {
            foodName: "올로로롤",
            foodImage: "Image1", 
            XYCoordinate:  [35.67, 146.02],
        },
        {
            foodName: "올로로롤",
            foodImage: "Image1", 
            XYCoordinate:  [35.67, 146.02],
        },
      ],
          totalCalories: 5100,
          totalNutrient : {carbohydrates:  240 ,proteins: 80, fat: 25, dietaryFiber: 2 },
          recommendNutrient : {carbohydrates:  200 , proteins: 80, fat: 50, dietaryFiber: 4 },
          imgurl : "/images/record_example.png"

    },

    "간식" : {
        food : [],
        totalCalories: 0,
        totalNutrient:{carbohydrates:  0 ,proteins: 0, fat: 0, dietaryFiber: 0 },
        recommendNutrient : {carbohydrates:  200 , proteins: 80, fat: 50, dietaryFiber: 4 },
        imgurl : undefined
    }

    }
    
    export {mealTimeData }