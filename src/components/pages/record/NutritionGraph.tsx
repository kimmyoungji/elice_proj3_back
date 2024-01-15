import { useEffect, useRef, useState } from 'react';
import styles from '@components/pages/record/nutritiongraph.module.css';
import getNutritionStandard from '@utils/getNutritionStandard';
import { mealDetailData, MealDetailData } from './mealDetailData';

interface NutritionGraphProps {
  meal: string;
}

interface UserData {
  email: string;
  username: string;
  password: string;
  birthday: string;
  gender: '남자' | '여자' | '기타';
  weight: number;
  height: number;
  goal: '체중감량' | '근육증량' | '체중유지' | '체중증량';
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
  gender: '남자',
  weight: 90,
  height: 190,
  goal: '체중감량',
  targetWeight: 80,
  targetCalories: 1200,
  activity: 4,
  img: undefined,
};

const standard = getNutritionStandard(userData);

const NutritionGraph = ({ meal }: NutritionGraphProps) => {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const nutrients = Object.entries(mealDetailData[meal].totalNutrient).map(
    ([key, value]) => {
      let nutrientKey;
      if (key === 'carbohydrates') nutrientKey = '탄수화물';
      else if (key === 'proteins') nutrientKey = '단백질';
      else if (key === 'fat') nutrientKey = '지방';
      else if (key === 'dietaryFiber') nutrientKey = '식이섬유';
      else nutrientKey = key;
      return { key: nutrientKey, value };
    }
  );

  return (
    <div className={styles.nutrients}>
      {nutrients.map((nutrient, idx) => (
        <div key={idx} className={styles.nutrient}>
          <p>{nutrient.key}</p>
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
                className={
                  nutrient.value / standard[idx] <= 1
                    ? styles.bar
                    : styles.overbar
                }
                cx='24'
                cy='24'
                r='22'
                strokeWidth='3'
                strokeDashoffset={
                  nutrient.value / standard[idx] < 1
                    ? circumference * (1 - nutrient.value / standard[idx])
                    : 0
                }
                strokeDasharray={circumference}
              />
            </svg>
            <p className={styles.percent}>
              {Math.floor((nutrient.value / standard[idx]) * 100)}%
            </p>
          </div>
          <p className={styles.gram}>
            {nutrient.value}/{standard[idx]}g
          </p>
        </div>
      ))}
    </div>
  );
};

export default NutritionGraph;
