import { useEffect, useRef, useState } from 'react';
import styles from '@components/pages/home/nutrients.module.css';

const nutrients = [
  { title: '탄수화물', value: 240 },
  { title: '단백질', value: 20 },
  { title: '지방', value: 23 },
  { title: '식이섬유', value: 0 },
];
const standard = [200, 80, 50, 4];

const Nutrients = () => {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={styles.nutrients}>
      {nutrients.map((nutrient, idx) => (
        <div className={styles.nutrient}>
          <p>{nutrient.title}</p>
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

export default Nutrients;
