interface UserData {
  email: string;
  username: string;
  password: string;
  birthday: string;
  gender: '남자' | '여자' | '기타';
  weight: number;
  height: number;
  goal: '체중감량' | '근육증량' | '체중유지' | '체중증량';
  targetWeight: number;
  targetCalories: number;
  activity: number;
  img: string | undefined;
}

const calculatedProtein = (userData: UserData) => {
  return userData.goal === '근육증량'
    ? userData.weight * 2
    : userData.weight * 1.2;
};

const getNutritionStandard = (userData: UserData) => {
  const protein = calculatedProtein(userData);
  const standard =
    userData.height < 175 ? [275, protein, 60, 25] : [300, protein, 80, 38];
  return standard;
};

export default getNutritionStandard;
