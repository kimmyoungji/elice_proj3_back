interface UserData {
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
  activity: number;
  img: string | undefined;
}

const getNutritionStandard = (data: UserData) => {
  const userGoal = data.goal;
  const userGoalCalories = data.targetCalories;
  const userGender = data.gender;
  const goalRatio = { 1: [3, 5, 2], 2: [4, 4, 2], 3: [5, 2, 3], 4: [4, 2, 4] };
  const ratioX = goalRatio[userGoal][0];
  const ratioY = goalRatio[userGoal][1];
  const ratioZ = goalRatio[userGoal][2];
  const k = userGender === 1 ? 38 : userGender === 2 ? 25 : 30;

  let z = 1;
  let x = (ratioX / ratioZ) * z;
  let y = (ratioY / ratioZ) * z;

  while (4 * x + 4 * y + 9 * z < userGoalCalories) {
    z++;
    x = (ratioX / ratioZ) * z;
    y = (ratioY / ratioZ) * z;
  }

  if (4 * x + 4 * y + 9 * z === userGoalCalories) {
    return { x, y, z, k };
  } else {
    return null;
  }
};

export default getNutritionStandard;
