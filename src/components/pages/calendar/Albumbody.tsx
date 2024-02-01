import classes from './album.module.css';
import { MealType } from './Album';

const Albumbody = ({
  arr,
  idx,
}: {
  arr: [MealType, number, string];
  idx: number;
}) => {
  return (
    <div className={classes['meal-img']}>
      <img src={arr[2]} alt='img' />
      <div className={classes['meal-card']} key={`date-${idx}`}>
        <div className={`b-regular`}>{arr[0]}</div>
        <div className={`${classes['meal-cal']} b-medium`}>{arr[1]} kcal</div>
      </div>
    </div>
  );
};

export default Albumbody;
