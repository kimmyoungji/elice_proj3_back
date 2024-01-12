import style from './nutritionAnalysis.module.css';
import { BarChart } from './BarChart';
import Bar from './Bar';
import { mealDetailData } from './mealDetailData';


interface NutritionAnalysisProps {
  meal : string
  className: string;
}


const goalCalories = 1300

const NutritionAnalysis = ({meal, className} : NutritionAnalysisProps ) => {
    
    const totalCalories = mealDetailData[meal].totalCalories
    const percentage = totalCalories === 0 ? 0 : Math.min(100, (totalCalories / goalCalories) * 100);
    const barFill = percentage >= 100 ? "#ff6a6a" : "#007bff"

    return (
    <>
        <div className={className}>
        <div className={style.header}> 
        <div className={style.title}>총섭취량</div>
        <div className={style.caloriesCount}>
        <div className={style.intakeCalories}> {totalCalories || 0}  </div>
        <div className={style.totalCalories}> /{goalCalories} </div>
        </div>
        </div>
        <BarChart>
                    <Bar
                    key="goal-calories"
                    width="100%"
                    height="20px" 
                    fill="#edf3f9" 
                    />

                    <Bar
                    key="consumed-calories"
                    width={`${percentage}%`}
                    height="20px" 
                    fill={barFill}
                    />
        </BarChart>

        </div>
      
    </>
    )
  };
  
  export default NutritionAnalysis;
  