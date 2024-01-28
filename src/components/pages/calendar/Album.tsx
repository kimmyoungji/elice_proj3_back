import { useNavigate } from 'react-router-dom';
import { useCalendarContext } from './Calendar';
import classes from './album.module.css';
import Albumbody from './Albumbody';
import { getMealsNumber } from '@utils/getMealNum';
import { useEffect, useState } from 'react';
import useCachingApi from '@hooks/useCachingApi';
import useIntersect from '@hooks/useIntersect';
import useApi from '@hooks/useApi';
export type MealType = '아침' | '점심' | '저녁' | '간식';

export interface AlbumArrType {
  date: string;
  dateArr: [MealType, number, string][];
}

export const returnWithZero = (num: string | number) => {
  return Number(num) < 10 ? `0${num}` : num;
};

//현재 연도와 월 가져오기
type AlbumApiResponse = {
  data: AlbumArrType[];
};
const Album = () => {
  const { thisYear, thisMonth } = useCalendarContext();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { trigger, result } = useCachingApi<AlbumApiResponse>({
    path: `/cumulative-record/month?month=${thisYear}-${returnWithZero(thisMonth)}-01&page=1`,
  });

  // const { trigger, result } = useApi<AlbumApiResponse>({
  //   path: `/cumulative-record/month?month=${thisYear}-${returnWithZero(thisMonth)}-01&page=${page}`,
  // });
  const navigate = useNavigate();
  // const safeResult = result as { data: AlbumArrType[] };

  const onClickCards = (val: string) => {
    console.log(val);
    navigate(
      `/record/${thisYear}-${returnWithZero(thisMonth)}-${returnWithZero(val)}`
    );
  };

  useEffect(() => {
    trigger('');
  }, []);
  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    if (entry.isIntersecting) {
      setIsLoading(true);
      observer.unobserve(entry.target);
      await trigger('');
      // await trigger({});
      observer.observe(entry.target);
      setIsLoading(false);
      setPage((prev) => prev + 1);
    }
  };

  const { setTarget } = useIntersect({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect,
  });

  return (
    <div className={classes.wrapper}>
      {result?.data?.map((day, idx) => (
        <div key={`album-${idx}`} className={classes.date}>
          <div
            className={`b-regular`}
          >{`${thisYear}.${returnWithZero(thisMonth)}.${returnWithZero(day.date)}`}</div>
          <div className={classes.cards}>
            {day.dateArr.map((arr, idx) => (
              <div
                key={`album-${idx}`}
                onClick={() =>
                  onClickCards(`${day.date}/${getMealsNumber[arr[0]]}`)
                }
              >
                <Albumbody arr={arr} idx={idx} key={`album-${idx}`} />
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* {!isLoading && <div ref={setTarget} />} */}
    </div>
  );
};

export default Album;
