export interface RecordProps {
  dateArr: Array<[number, number, string | null]>;
}

// export const MealDataToSelectedMealDataType = (
//   data: MealDetailData[keyof MealDetailData]
// ): selecetedMealDataType => {
//   return {
//     ...data,
//   };
// };

export interface MealDetailData {
  [key: string]: {
    foods: {
      foodName?: string;
      XYCoordinate?: number[];
      counts?: number;
      foodInfoId?: string;
      recordId?: string;
    }[];
    totalCalories: number;
    totalNutrient: {
      carbohydrates: number;
      proteins: number;
      fats: number;
      dietaryFiber: number;
    };
    imgUrl: string | undefined;
    recommendNutrient: {
      carbohydrates: number;
      proteins: number;
      fats: number;
      dietaryFiber: number;
    };
    targetCalories: number;
  };
}

export interface selecetedMealDataType {
  foods: {
    foodName: string;
    XYCoordinate: number[];
    counts?: number;
    foodInfoId?: string;
  }[];
  totalCalories: number;
  totalNutrient: {
    carbohydrates: number;
    proteins: number;
    fats: number;
    dietaryFiber: number;
  };
  recommendNutrient: {
    carbohydrates: number;
    proteins: number;
    fats: number;
    dietaryFiber: number;
  };
  imgUrl: string | undefined;
}

export interface MealCoordinateType {
  foodName: string;
  XYCoordinate?: number[];
  counts?: number;
  foodInfoId?: string;
}

export interface MealPageProps {
  selectedMealNumber?: string;
  date: string;
}

export interface MealDetailProps {
  date: string;
  selectedMealNumber: string;
  data?: MealDetailData | undefined;
}

export interface MealImgProps {
  className: string;
  date: string;
  data?: MealDetailData | undefined;
  selectedMealNumber: string;
}

export interface MealTagProps {
  className: string;
  data?: MealDetailData;
  selectedMealNumber: string;
}

export interface MealNutritionAnalysisProps {
  data?: MealDetailData;
  className: string;
  selectedMealNumber: string;
}

export interface ImgTagContentProps {
  imgUrl: string;
  className: string;
  data?: MealDetailData;
  selectedMealNumber: string;
}

export interface CustomCSSProperties extends React.CSSProperties {
  '--fillWidth': string;
}

export interface BarProps {
  width: string;
  height: string;
  fill: string;
  className?: string;
  style?: CustomCSSProperties;
}

export type totalNutrientsType = {
  carbohydrates: number;
  proteins: number;
  fats: number;
  dietaryFiber: number;
};

export interface NutritionDonutChartProps {
  totalNutrient: totalNutrientsType;
  isShowingTotal: boolean;
  data?: MealDetailData;
  selectedMealNumber: string;
}

export interface Nutrient {
  key: string;
  value: number;
  nutrientRatio: number;
  strokeDashoffset: number;
  customStyle: React.CSSProperties & {
    '--initialOffset': string;
    '--finalOffset': string;
  };
}

export type TagData = {
  XYCoordinate: number[];
  foodName: string;
};

export type MergedTagData = {
  XYCoordinate: number[];
  foodNames: string[];
};