import style from '@styles/record/nutritionAnalysis.module.css';
import { BarChart } from './BarChart';
import Bar from './Bar';

interface NutritionAnalysisProps {
    className?: string;
  }

interface MealData {
    mealTime: string;
    calories: number | string;
    carbo: number | string;
    fat: number | string;
    fiber: number | string;
  }

const nutritionData : MealData[] = [
    { mealTime: "점심", calories : 300 , carbo:  "", fat :  "", fiber:  ""}
]

const goalCalories = 1300

const NutritionAnalysis: React.FC<NutritionAnalysisProps> = ({className} ) => {
    
    const totalCalories = nutritionData.reduce((sum, item) => {
        const calories = typeof item.calories === 'number' ? item.calories : 0;
        return sum + calories;
      }, 0); 
    const percentage = totalCalories === 0 ? 0 : Math.min(100, (totalCalories / goalCalories) * 100);
    const barFill = percentage >= 100 ? "#ff6a6a" : "#007bff"

    return (
    <>
        <div className={className}>
        <div className={style.header}> 
        <div className={style.title}>총섭취량</div>
        <div className={style.caloriesCount}>
        <div className={style.intakeCalories}> {nutritionData[0].calories || 0}  </div>
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
  