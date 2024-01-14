import { useCalendarContext } from './Calendar';
import classes from './album.module.css';

const DUMMYAlbumArr = [
  {
    date: '01',
    dateArr: [
      ['아침', 400],
      ['점심', 350],
    ],
  },
  {
    date: '06',
    dateArr: [
      ['아침', 400],
      ['점심', 350],
      ['저녁', 250],
    ],
  },
  {
    date: '07',
    dateArr: [
      ['아침', 400],
      ['점심', 350],
      ['저녁', 250],
      ['간식', 250],
    ],
  },
  {
    date: '07',
    dateArr: [
      ['아침', 400],
      ['점심', 350],
      ['저녁', 250],
      ['간식', 250],
    ],
  },
];

//현재 연도와 월 가져오기

const Album = () => {
  const { thisYear, thisMonth } = useCalendarContext();

  return (
    <div>
      {DUMMYAlbumArr.map((day, idx) => (
        <div key={`album-${idx}`} className={classes.date}>
          <div className={`b-regular`}>{`${thisYear}.${thisMonth}.${day.date}`}</div>
          <div className={classes.cards}>
            {day.dateArr.map((arr, idx) => (
              <div className={classes['meal-card']} key={`date-${idx}`}>
                <div className={`b-regular`}>{arr[0]}</div>
                <div className={`${classes['meal-cal']} b-medium`}>{arr[1]}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Album;
