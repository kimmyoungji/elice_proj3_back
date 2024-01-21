import style from './mealnutritionanalysis.module.css';
import { NutritionBarChart } from './NutritionBarChart';
import NutritionBar from './NutritionBar';
import { useEffect, useState } from 'react';
import { MealNutritionAnalysisProps } from './RecordTypes';
import { userData } from '../my-page/DummyUserData';
import NutritionDonutChart from './NutritionDonutChart';

const goalCalories = userData.targetCalories;

const MealNutritionAnalysis = ({
  className,
  data,
  selectedMealNumber,
}: MealNutritionAnalysisProps) => {
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const totalCalories = data[selectedMealNumber].totalCalories;
  const percentage =
    totalCalories === 0
      ? 0
      : Math.min(100, (totalCalories / goalCalories) * 100);
  const barFill = percentage >= 100 ? '#ff6a6a' : '#007bff';

  useEffect(() => {
    setAnimationTrigger(false);
    const animationTimer = setTimeout(() => {
      setAnimationTrigger(true);
    }, 100);
    return () => clearTimeout(animationTimer);
  }, [selectedMealNumber]);

  return (
    <>
      <div className={className}>
        <div className={style.header}>
          <div className={style.title}>총섭취량</div>
          <div className={style.caloriesCount}>
            <div className={style.intakeCalories}> {totalCalories || 0} </div>
            <div className={style.totalCalories}> /{goalCalories} </div>
          </div>
        </div>
        <NutritionBarChart>
          <NutritionBar
            key='goal-calories'
            width='100%'
            height='20px'
            fill='#edf3f9'
          />
          <NutritionBar
            key='consumed-calories'
            width='0%'
            className={`${animationTrigger ? style.startAnimation : ''}`}
            style={{ '--fillWidth': `${percentage}%` }}
            height='20px'
            fill={barFill}
          />
        </NutritionBarChart>
        <NutritionDonutChart
          data={data}
          selectedMealNumber={selectedMealNumber}
        />
      </div>
    </>
  );
};

export default MealNutritionAnalysis;
