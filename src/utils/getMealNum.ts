import { MealType } from '@components/pages/calendar/Album';

export const getMealsNumber: {
  [key in MealType]: number;
} = {
  아침: 1,
  점심: 2,
  저녁: 3,
  간식: 4,
};

type MealnumberType = 1 | 2 | 3 | 4;

export const getNumberMeal: Record<MealnumberType, MealType> = {
  1: '아침',
  2: '점심',
  3: '저녁',
  4: '간식',
};
