const changeKeyToNumber: { [key: string]: number } = {
  gender: 1,
  birthDay: 2,
  height: 3,
  weight: 4,
  dietGoal: 5,
  activityAmount: 6,
};

export const checkValuesNullOrEmpty = <T>(obj: {
  [key in keyof T]: string | number | null | '';
}): number | boolean => {
  let returnVal: boolean | string = false;
  let returnNum = 0;
  for (let key in obj) {
    ++returnNum;
    if (obj[key] === null || obj[key] === '' || obj[key] === undefined) {
      return changeKeyToNumber[key];
    }
  }
  return returnVal;
};
