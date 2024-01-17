import style from './nutritionanalysis.module.css';
import { BarChart } from './BarChart';
import Bar from './Bar';
import NutritionGraph from './NutritionGraph';
import { mealDetailData } from './mealDetailData';
import { useEffect, useState } from 'react';

interface NutritionAnalysisProps {
  meal: string;
  className: string;
}

const goalCalories = 1300;

const NutritionAnalysis = ({ meal, className }: NutritionAnalysisProps) => {
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const totalCalories = mealDetailData[meal].totalCalories;
  const percentage =
    totalCalories === 0
      ? 0
      : Math.min(100, (totalCalories / goalCalories) * 100);
  const barFill = percentage >= 100 ? '#ff6a6a' : '#007bff';

  useEffect(() => {
    setAnimationTrigger(false);
    console.log('애니메이션 확인');

    setTimeout(() => {
      setAnimationTrigger(true);
    }, 100);
  }, [meal]);

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
        <BarChart>
          <Bar key='goal-calories' width='100%' height='20px' fill='#edf3f9' />
          <Bar
            key='consumed-calories'
            width='0%'
            // className={style.barAnimated}
            className={`${animationTrigger ? style.startAnimation : ''}`}
            style={{ '--fillWidth': `${percentage}%` }}
            height='20px'
            fill={barFill}
          />
        </BarChart>
        <NutritionGraph meal={meal} />
      </div>
    </>
  );
};

export default NutritionAnalysis;
