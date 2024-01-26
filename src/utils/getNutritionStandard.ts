import { UserData } from '@components/pages/my-page/MypageTypes';

const getNutritionStandard = (data: UserData) => {
  const userGoal = data.diet_goal;
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
  let totalCalories = 4 * x + 4 * y + 9 * z;

  while (totalCalories < userGoalCalories) {
    z++;
    x = (ratioX / ratioZ) * z;
    y = (ratioY / ratioZ) * z;
    totalCalories = 4 * x + 4 * y + 9 * z;
  }

  return totalCalories - userGoalCalories < 50
    ? {
        carbohydrates: x,
        proteins: y,
        fats: z,
        dietaryFiber: k,
      }
    : { carbohydrates: 200, proteins: 100, fats: 40, dietaryFiber: 30 };
};

export default getNutritionStandard;
