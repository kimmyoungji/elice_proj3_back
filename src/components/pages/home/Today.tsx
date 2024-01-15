import styles from '@components/pages/home/today.module.css';
import Calorie from './Calorie';
import MealCard from './MealCard';
import Nutrients from './Nutrients';

const Today = () => {
  return (
    <div className={styles.today}>
      <p className={styles.title}>오늘의 식단</p>
      <Calorie />
      <Nutrients />
      <MealCard />
    </div>
  );
};

export default Today;
