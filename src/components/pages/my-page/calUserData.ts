import { UserData } from './MypageTypes';

export const calBMR = ({ data, age }: { data: UserData; age: number }) => {
  return data.gender === 1
    ? 10 * data.weight + 6.25 * data.height - 5 * age + 5
    : data.gender === 2
      ? 10 * data.weight + 6.25 * data.height - 5 * age - 161
      : data.gender === 3 && data.height > 175
        ? 10 * data.weight + 6.25 * data.height - 5 * age + 5
        : 10 * data.weight + 6.25 * data.height - 5 * age - 161;
};

export const calBMRCalories = ({
  bmr,
  data,
}: {
  bmr: number;
  data: UserData;
}) => {
  return data.activityAmount === 1
    ? bmr * 1.2
    : data.activityAmount === 2
      ? bmr * 1.3
      : data.activityAmount === 3
        ? bmr * 1.55
        : bmr * 1.7;
};

export const adjustCaloriesByGoal = ({
  data,
  bmrCalories,
}: {
  data: UserData;
  bmrCalories: number;
}) => {
  return data.diet_goal === 1
    ? bmrCalories + 400 // 근육증량
    : data.diet_goal === 2
      ? bmrCalories - 400 // 체중감량
      : data.diet_goal === 3
        ? bmrCalories // 체중유지
        : bmrCalories + 300; // 체중증량
};
