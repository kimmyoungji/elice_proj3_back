import { useEffect, useState } from 'react';
import styles from '@components/pages/record/nutritiongraph.module.css';
import getNutritionStandard from '@utils/getNutritionStandard';
import { mealDetailData } from './mealDetailData';

interface NutritionGraphProps {
  meal: string;
}

interface Nutrient {
  key: string;
  value: number;
  nutrientRatio: number;
  strokeDashoffset: number;
  customStyle: React.CSSProperties & {
    '--initialOffset': string;
    '--finalOffset': string;
  };
}

interface UserData {
  email: string;
  username: string;
  password: string;
  birthday: string;
  gender: 1 | 2 | 3;
  weight: number;
  height: number;
  goal: 1 | 2 | 3 | 4;
  targetWeight: number;
  targetCalories: number;
  activity: number;
  img: string | undefined;
}
const userData: UserData = {
  email: 'elice@gmail.com',
  username: 'elice',
  password: 'Elice1234@!',
  birthday: '2005-02-03',
  gender: 1,
  weight: 90,
  height: 190,
  goal: 2,
  targetWeight: 80,
  targetCalories: 1200,
  activity: 4,
  img: undefined,
};

const NutritionGraph = ({ meal }: NutritionGraphProps) => {
  const [data, setData] = useState(userData);
  const [mealData, setMealData] = useState(mealDetailData);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  useEffect(() => {
    setAnimationTrigger(false);
    setTimeout(() => {
      setAnimationTrigger(true);
    }, 100);
  }, [meal]);

  const result = getNutritionStandard(data);
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const standard = result
    ? [result.x, result.y, result.z, result.k]
    : [0, 0, 0, 0];

  let nutrients: Nutrient[] = [];

  if (result && mealData[meal]) {
    nutrients = Object.entries(mealData[meal].totalNutrient).map(
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

export default NutritionGraph;
