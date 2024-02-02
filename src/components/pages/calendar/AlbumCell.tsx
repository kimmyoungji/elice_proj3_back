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
        {arr[2] ? (
          <img src={arr[2]} alt='img' />
        ) : (
          <img src='/images/9gram_logo.png' alt='img' />
        )}
        <div className={classes['meal-card']} key={`date-${idx}`}>
          {arr[2] ? (
            <>
              <div className={`${classes['meal-imgcal']} b-regular `}>
                {getNumberMeal[arr[0]]}
              </div>
              <div className={`${classes['meal-imgcal']} b-medium`}>
                {arr[1]} kcal
              </div>
            </>
          ) : (
            <>
              <div className={`${classes['meal-noimgcal']} b-regular`}>
                {getNumberMeal[arr[0]]}
              </div>
              <div className={`${classes['meal-noimgcal']} b-medium`}>
                {arr[1]} kcal
              </div>
            </>
          )}
        </div>
      </div>
      {!isLoading && <div ref={setTarget} />}
    </>
  );
};

export default AlbumCell;
