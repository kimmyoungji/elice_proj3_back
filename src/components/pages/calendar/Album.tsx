import { useNavigate } from 'react-router-dom';
import { useCalendarContext } from './Calendar';
import classes from './album.module.css';
import Albumbody from './Albumbody';
export type MealType = '아침' | '점심' | '저녁' | '간식';

export interface DummyAlbumArrType {
  date: string;
  dateArr: [MealType, number, string][];
}

const DUMMYAlbumArr: DummyAlbumArrType[] = [
  {
    date: '01',
    dateArr: [
      ['아침', 400, 'https://source.unsplash.com/random/110x110'],
      ['점심', 350, 'https://source.unsplash.com/random/110x110'],
    ],
  },
  {
    date: '06',
    dateArr: [
      ['아침', 400, 'https://source.unsplash.com/random/110x110'],
      ['점심', 350, 'https://source.unsplash.com/random/110x110'],
      ['저녁', 250, 'https://source.unsplash.com/random/110x110'],
    ],
  },
  {
    date: '07',
    dateArr: [
      ['아침', 400, 'https://source.unsplash.com/random/110x110'],
      ['점심', 350, 'https://source.unsplash.com/random/110x110'],
      ['저녁', 250, 'https://source.unsplash.com/random/110x110'],
      ['간식', 250, 'https://source.unsplash.com/random/110x110'],
    ],
  },
];

//현재 연도와 월 가져오기

const Album = () => {
  const { thisYear, thisMonth } = useCalendarContext();
  const navigate = useNavigate();

  const onClickCards = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickedId = (e.target as HTMLDivElement).id;
    navigate(`/record/${thisYear}-${thisMonth}-${clickedId}`);
  };

  return (
    <div className={classes.wrapper}>
      {DUMMYAlbumArr.map((day, idx) => (
        <div key={`album-${idx}`} className={classes.date}>
          <div
            className={`b-regular`}
          >{`${thisYear}.${thisMonth}.${day.date}`}</div>
          <div className={classes.cards} onClick={onClickCards}>
            {day.dateArr.map((arr, idx) => (
              <Albumbody arr={arr} idx={idx} day={day} key={`album-${idx}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Album;
