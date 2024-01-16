import getDates from '@utils/getDates';

interface UserData {
  birthday: string;
  gender: number;
  weight: number;
  height: number;
  activity: number;
  goal: number;
}

export const calAge = ({ data }: { data: UserData }) => {
  const { thisYear, thisMonthNum, thisDate } = getDates();
  const compareYear = thisYear - Number(data.birthday.split('-')[0]);
  const compareMonth = thisMonthNum - Number(data.birthday.split('-')[1]);
  const compareDay = thisDate - Number(data.birthday.split('-')[2]);
  return compareMonth < 0 || (compareMonth === 0 && compareDay < 0)
    ? compareYear - 1
    : compareYear;
};

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
  return data.activity === 1
    ? bmr * 1.2
    : data.activity === 2
      ? bmr * 1.375
      : data.activity === 3
        ? bmr * 1.55
        : bmr * 1.8125;
};

export const adjustCaloriesByGoal = ({
  data,
  bmrCalories,
}: {
  data: UserData;
  bmrCalories: number;
}) => {
  return data.goal === 1
    ? bmrCalories + 500 // 근육증량
    : data.goal === 2
      ? bmrCalories - 500 // 체중감량
      : data.goal === 3
        ? bmrCalories // 체중유지
        : bmrCalories + 300; // 체중증량
};
