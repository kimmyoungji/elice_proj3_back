import { Plus } from '@assets/Plus';
import styles from '@components/pages/home/mealcard.module.css';

interface Props {
  dateArr: [string, number, string | undefined][];
}

const MealCard = ({ dateArr }: Props) => {
  return (
    <div className={styles.mealcard_wrapper}>
      {dateArr.map((meal, idx) => (
        <div key={idx} className={styles.mealcard}>
          {meal[1] !== 0 || meal[2] !== undefined ? (
            <>
              <img className={styles.img} src={meal[2]} alt={meal[0]} />
              <div className={styles.black}></div>
              <p className={`${styles.meal} b-regular`}>{meal[0]}</p>
              <Plus className={styles.plus} width='25' />
              <p className={`${styles.calorie} b-medium`}>{meal[1]}kcal</p>
            </>
          ) : (
            <>
              <div className={styles.block}></div>
              <p className={`${styles.nomeal} b-regular`}>{meal[0]}</p>
              <Plus className={styles.noplus} width='25' />
              <p className={`${styles.nocalorie} b-medium`}>{meal[1]}kcal</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MealCard;
