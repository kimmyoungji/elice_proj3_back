interface TargetNutrients {
  carbohydrates: number;
  proteins: number;
  fats: number;
  dietaryFiber: number;
  [key: string]: number;
}

export type UserData = {
  email: string;
  username: string;
  password: string;
  birthday: string;
  gender: 1 | 2 | 3;
  weight: number;
  height: number;
  goal: 1 | 2 | 3 | 4;
  targetWeight: number;
  targetCalories: number;
  targetNutrients: TargetNutrients;
  activity: 1 | 2 | 3 | 4;
  img: string | undefined;
};

export const userData = {
  email: 'elice@gmail.com',
  username: 'elice',
  password: 'Elice1234@!',
  birthday: '1997-04-26',
  gender: 2 as 1 | 2 | 3,
  weight: 90,
  height: 190,
  goal: 2 as 1 | 2 | 3 | 4,
  targetWeight: 80,
  targetCalories: 1200,
  targetNutrients: {
    carbohydrates: 100,
    proteins: 60,
    fats: 30,
    dietaryFiber: 23,
  },
  activity: 4 as 1 | 2 | 3 | 4,
  img: 'https://reclo.s3.ap-northeast-2.amazonaws.com/upload/itemImage/40962e2811b76d1ab5f661013f500061_%ED%9B%84%EB%93%9C.jpg',
};
