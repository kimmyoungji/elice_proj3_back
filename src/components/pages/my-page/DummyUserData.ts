interface TargetNutrients {
  carbohydrates: number;
  proteins: number;
  fats: number;
  dietaryFiber: number;
  [key: string]: number;
}

export type UserData = {
  email?: string;
  username?: string;
  password?: string;
  birthday?: string;
  gender?: 1 | 2 | 3;
  profileImage?: string | undefined;

  healthInfo: {
    weight: number;
    height: number;
    goal: 1 | 2 | 3 | 4;
    targetWeight: number;
    targetCalories: number;
    recommendIntake: TargetNutrients;
    activityAmount: 1 | 2 | 3 | 4;
  };
};

export const userData = {
  email: 'elice@gmail.com',
  username: 'elice',
  password: 'Elice1234@!',
  birthday: '1997-04-26',
  gender: 2 as 1 | 2 | 3,

  profileImage:
    'https://reclo.s3.ap-northeast-2.amazonaws.com/upload/itemImage/40962e2811b76d1ab5f661013f500061_%ED%9B%84%EB%93%9C.jpg',

  healthInfo: {
    weight: 90,
    height: 190,
    goal: 2 as 1 | 2 | 3 | 4,
    targetWeight: 80,
    targetCalories: 1200,
    recommendIntake: {
      carbohydrates: 100,
      proteins: 60,
      fats: 30,
      dietaryFiber: 23,
    },
    activityAmount: 4 as 1 | 2 | 3 | 4,
  },
};
