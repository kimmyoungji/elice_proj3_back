import { MealDetailData } from './DummyMealData';

export interface MealPageProps {
  selectedMealNumber: 1 | 2 | 3 | 4;
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

export interface NutritionAnalysisProps {
  data: MealDetailData;
  className: string;
  selectedMealNumber: 1 | 2 | 3 | 4;
}

export interface PutImgTagProps {
  imgUrl: string;
  className: string;
  data: MealDetailData;
  selectedMealNumber: 1 | 2 | 3 | 4;
}

export interface NutritionGraphProps {
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
