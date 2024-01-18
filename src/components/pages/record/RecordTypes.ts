import { MealDetailData } from './DummyMealData';

export interface MealPageProps {
  selectedMealNumber: 1 | 2 | 3 | 4;
  date: string;
}

export interface MealDetailProps {
  meal: string;
  date: string;
  selectedMealNumber: 1 | 2 | 3 | 4;
  data: MealDetailData;
}

export interface MealImgProps {
  meal: string;
  className: string;
  date: string;
  data: MealDetailData;
  selectedMealNumber: 1 | 2 | 3 | 4;
}

export interface MealTagProps {
  meal: string;
  className: string;
  data: MealDetailData;
  selectedMealNumber: 1 | 2 | 3 | 4;
}

export interface NutritionAnalysisProps {
  meal: string;
  data: MealDetailData;
  className: string;
  selectedMealNumber: 1 | 2 | 3 | 4;
}

export interface PutImgTagProps {
  mealType: string;
  imgUrl: string;
  className: string;
  data: MealDetailData;
  selectedMealNumber: 1 | 2 | 3 | 4;
}

export interface NutritionGraphProps {
  meal: string;
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
