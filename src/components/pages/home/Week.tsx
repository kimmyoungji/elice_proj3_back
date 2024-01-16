import styles from '@components/pages/home/week.module.css';
import Days from './Days';
import SelectWeek from './SelectWeek';

const Week = () => {
  return (
    <div className={styles.week_wrapper}>
      <SelectWeek />
      <Days />
    </div>
  );
};

export default Week;
