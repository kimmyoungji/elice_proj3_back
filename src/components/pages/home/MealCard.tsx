import styles from '@components/pages/home/week.module.css';

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
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className={`w-6 h-6 ${styles.plus}`}
                width='25'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              <p className={`${styles.calorie} b-medium`}>{meal[1]}kcal</p>
            </>
          ) : (
            <>
              <div className={styles.block}></div>
              <p className={`${styles.nomeal} b-regular`}>{meal[0]}</p>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className={`w-6 h-6 ${styles.noplus}`}
                width='25'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              <p className={`${styles.nocalorie} b-medium`}>{meal[1]}kcal</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MealCard;
