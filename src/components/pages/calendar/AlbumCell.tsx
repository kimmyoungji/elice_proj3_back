import classes from './album.module.css';
import { MealType } from './Album';
import { getNumberMeal } from '@utils/getMealNum';

const AlbumCell = ({
  arr,
  idx,
  setTarget,
  isLoading,
}: {
  arr: [MealType, number, string];
  idx: number;
  setTarget: React.LegacyRef<HTMLDivElement>;
  isLoading: boolean;
}) => {
  return (
    <>
      <div className={classes['meal-img']}>
        <img src={arr[2]} alt='img' />
        <div className={classes['meal-card']} key={`date-${idx}`}>
          <div className={`b-regular`}>{getNumberMeal[arr[0]]}</div>
          <div className={`${classes['meal-cal']} b-medium`}>{arr[1]} kcal</div>
        </div>
      </div>
      {!isLoading && <div ref={setTarget} />}
    </>
  );
};

export default AlbumCell;
