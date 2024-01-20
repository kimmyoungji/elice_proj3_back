import { useEffect, useState } from 'react';
import styles from '@components/pages/record/nutritiondonutchart.module.css';
import getNutritionStandard from '@utils/getNutritionStandard';
import { NutritionDonutChartProps, Nutrient } from './RecordTypes';
import { userData } from '../my-page/DummyUserData';

const NutritionDonutChart = ({
  data,
  selectedMealNumber,
}: NutritionDonutChartProps) => {
  const [userNutritionData, setUserNutritionData] = useState(userData);
  const [mealData, setMealData] = useState(data);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  useEffect(() => {
    setAnimationTrigger(false);
    setTimeout(() => {
      setAnimationTrigger(true);
    }, 100);
  }, [selectedMealNumber]);

  const result = getNutritionStandard(userNutritionData);
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const standard = result
    ? [result.carbohydrates, result.proteins, result.fats, result.dietaryFiber]
    : [0, 0, 0, 0];

  let nutrients: Nutrient[] = [];

  if (result && mealData[selectedMealNumber]) {
    nutrients = Object.entries(mealData[selectedMealNumber].totalNutrient).map(
      ([key, value], idx) => {
        let nutrientKey;
        if (key === 'carbohydrates') nutrientKey = '탄수화물';
        else if (key === 'proteins') nutrientKey = '단백질';
        else if (key === 'fats') nutrientKey = '지방';
        else if (key === 'dietaryFiber') nutrientKey = '식이섬유';
        else nutrientKey = key;

        const nutrientRatio = value / standard[idx];
        const strokeDashoffset =
          nutrientRatio < 1 ? circumference * (1 - nutrientRatio) : 0;

        const customStyle: React.CSSProperties & {
          '--initialOffset': string;
          '--finalOffset': string;
        } = {
          '--initialOffset': `${circumference}px`,
          '--finalOffset': `${strokeDashoffset}px`,
        };

        return {
          key: nutrientKey,
          value,
          nutrientRatio,
          strokeDashoffset,
          customStyle,
        };
      }
    );

    return (
      <div className={styles.nutrients}>
        {nutrients.map((nutrient, idx) => (
          <div key={idx} className={styles.nutrient}>
            <p className={styles.nutrientTitle}>{nutrient.key}</p>
            <div className={styles.progress_wrapper}>
              <svg
                className={styles.progress}
                width='48'
                height='48'
                viewBox='0 0 48 48'
              >
                <circle
                  className={styles.frame}
                  cx='24'
                  cy='24'
                  r='22'
                  strokeWidth='3'
                  strokeDashoffset='1'
                  strokeDasharray={circumference}
                />
                <circle
                  key={idx}
                  className={`${nutrient.nutrientRatio <= 1 ? styles.bar : styles.overbar} ${animationTrigger ? styles.animatedBar : ''}`}
                  cx='24'
                  cy='24'
                  r='22'
                  strokeWidth='3'
                  style={nutrient.customStyle}
                  strokeDashoffset={nutrient.strokeDashoffset}
                  strokeDasharray={circumference}
                />
              </svg>
              <p className={styles.percent}>
                {Math.floor(nutrient.nutrientRatio * 100)}%
              </p>
            </div>
            <p className={styles.gram}>
              {nutrient.value}/{standard[idx]}g
            </p>
          </div>
        ))}
      </div>
    );
  }
};

export default NutritionDonutChart;
