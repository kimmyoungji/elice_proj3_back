import { useEffect, useState } from 'react';
import {
  adjustCaloriesByGoal,
  calBMR,
  calBMRCalories,
} from '@components/pages/my-page/calUserData';
import { UserData } from '@components/pages/my-page/MypageTypes';

const useUpdateDataAndCalories = <T>(updatedData: any) => {
  const [goalCalories, setGoalCalories] = useState(
    Math.round(
      adjustCaloriesByGoal({
        data: updatedData,
        bmrCalories: calBMRCalories({
          bmr: calBMR({ data: updatedData }),
          data: updatedData,
        }),
      })
    )
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

  useEffect(() => {
    setGoalCalories(updatedGoalCalories);
  }, []);

  return goalCalories;
};

export default useUpdateDataAndCalories;
