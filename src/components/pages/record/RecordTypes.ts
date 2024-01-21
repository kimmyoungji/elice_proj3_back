import { MealDetailData } from './DummyMealData';

export interface MealPageProps {
  selectedMealNumber: 1 | 2 | 3 | 4 | undefined;
  date: string;
}

export interface MealDetailProps {
  date: string;
  selectedMealNumber: 1 | 2 | 3 | 4;
  data: MealDetailData;
}

export interface MealImgProps {
  className: string;
  date: string;
  data: MealDetailData;
  selectedMealNumber: 1 | 2 | 3 | 4;
}

export interface MealTagProps {
  className: string;
  data: MealDetailData;
  selectedMealNumber: 1 | 2 | 3 | 4;
}

export interface MealNutritionAnalysisProps {
  data: MealDetailData;
  className: string;
  selectedMealNumber: 1 | 2 | 3 | 4;
}

export interface ImgTagContentProps {
  imgUrl: string;
  className: string;
  data: MealDetailData;
  selectedMealNumber: 1 | 2 | 3 | 4;
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
  totalCalories: number;
  data: MealDetailData;
  selectedMealNumber: 1 | 2 | 3 | 4;
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
  foodImage: string;
};

export type MergedTagData = {
  XYCoordinate: number[];
  foodNames: string[];
};
