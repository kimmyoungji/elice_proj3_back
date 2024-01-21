export interface RecordData {
  food: {
    [key: number]: {
      mealCalories: number;
      img: string | undefined;
    };
  };
}

// 유림님이 맡으신 MVP 부분
const recordData: RecordData = {
  food: {
    1: {
      mealCalories: 1400,
      img: '/images/record_example.png',
    },

    2: {
      mealCalories: 2500,
      img: undefined,
    },

    3: {
      mealCalories: 5100,
      img: '/images/record_example.png',
    },

    4: {
      mealCalories: 0,
      img: undefined,
    },
  },
};

export { recordData };
