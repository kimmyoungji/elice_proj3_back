import { useEffect, useState } from 'react';
import styles from '@components/pages/record/nutritiondonutchart.module.css';
import {
  MealDetailData,
  NutritionDonutChartProps,
  totalNutrientsType,
} from './RecordTypes';
import { nutrientNames, NutrientKey } from './recordMappingConstant';

const radius = 22;
const circumference = 2 * Math.PI * radius;

const initialSet = {
  carbohydrates: 0,
  proteins: 0,
  fats: 0,
  dietaryFiber: 0,
};

const NutritionDonutChart = ({
  totalNutrient,
  isShowingTotal,
  data,
  selectedMealNumber,
}: NutritionDonutChartProps) => {
  const [mealData, setMealData] = useState<MealDetailData>(data || {});
  const [animationTrigger, setAnimationTrigger] = useState(false);

  useEffect(() => {
    setMealData(data || {});
  }, [data]);
  useEffect(() => {
    setAnimationTrigger(false);
    setTimeout(() => {
      setAnimationTrigger(true);
    }, 100);
  }, [isShowingTotal, selectedMealNumber]);

  // const getNutrientsData = (selectedMealNumber) => {
  //   if (mealData && mealData[selectedMealNumber]) {
  //     return isShowingTotal
  //       ? mealData[selectedMealNumber].totalNutrient
  //       : totalNutrient;
  //   }
  //   return initialSet; // 데이터가 없는 경우 초기값 사용
  // };

  // const allNutrientsData = [1, 2, 3, 4].map((selectedMealNumber) => ({
  //   selectedMealNumber,
  //   data: getNutrientsData(selectedMealNumber),
  // }));

  const recommendNutrient =
    mealData?.[selectedMealNumber]?.recommendNutrient || initialSet;

  // const totalStandard = [
  //   totalNutrient?.carbohydrates || 0,
  //   totalNutrient?.proteins || 0,
  //   totalNutrient?.fats || 0,
  //   totalNutrient?.dietaryFiber || 0,
  // ];

  const standard = [
    recommendNutrient.carbohydrates || 0,
    recommendNutrient.proteins || 0,
    recommendNutrient.fats || 0,
    recommendNutrient.dietaryFiber || 0,
  ];

  const nutrientsData: totalNutrientsType = isShowingTotal
    ? mealData?.[selectedMealNumber]?.totalNutrient || recommendNutrient
    : totalNutrient || recommendNutrient;

  const nutrients = Object.entries(nutrientsData).map(([key, value], idx) => {
    let nutrientKey = nutrientNames[key as NutrientKey] || key;

    const nutrientRatio = value !== 0 ? value / standard[idx] : 0;
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
  });

  console.log(nutrients);
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
};

export default NutritionDonutChart;
