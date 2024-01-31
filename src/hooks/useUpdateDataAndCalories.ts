import { useState } from 'react';
import {
  adjustCaloriesByGoal,
  calBMR,
  calBMRCalories,
} from '@components/pages/my-page/calUserData';
import { UserData } from '@components/pages/my-page/MypageTypes';

const useUpdateDataAndCalories = <T>(updatedData: any) => {
  const [data, setData] = useState(updatedData);
  const [bmr, setBmr] = useState(calBMR({ data }));
  const [bmrCalories, setBmrCalories] = useState(calBMRCalories({ bmr, data }));
  const [goalCalories, setGoalCalories] = useState(
    Math.round(adjustCaloriesByGoal({ data, bmrCalories }))
  );

  const updatedBmr = calBMR({ data: updatedData });
  const updatedBmrCalories = calBMRCalories({
    bmr: updatedBmr,
    data: updatedData,
  });
  const updatedGoalCalories = Math.round(
    adjustCaloriesByGoal({
      data: updatedData,
      bmrCalories: updatedBmrCalories,
    })
  );

  setData(updatedData);
  setBmr(updatedBmr);
  setBmrCalories(updatedBmrCalories);
  setGoalCalories(updatedGoalCalories);

  return goalCalories;
};

export default useUpdateDataAndCalories;
