import { useEffect, useRef, useState } from "react";
import styles from "@components/pages/home/today.module.css";

const meallist = [
  { meal: "아침", imgUrl: "", calorie: 530 },
  { meal: "점심", imgUrl: "", calorie: 315 },
  { meal: "저녁", imgUrl: undefined, calorie: 0 },
  { meal: "간식", imgUrl: undefined, calorie: 0 },
];

const MealCard = () => {
  const [state, setState] = useState(0);

  return (
    <div className={styles.mealcard_wrapper}>
      {meallist.map((meal, idx) => (
        <div key={idx} className={styles.mealcard}>
          <img className={styles.img} src={meal.imgUrl} alt={meal.meal} />
          {meal.imgUrl !== undefined ? (
            <div className={styles.black}></div>
          ) : (
            <div className={styles.block}></div>
          )}
          <p className={styles.meal}>{meal.meal}</p>
          <svg className={styles.plus}></svg>
          <p className={styles.calorie}>{meal.calorie}kcal</p>
        </div>
      ))}
    </div>
  );
};

export default MealCard;
