import { useNavigate } from 'react-router-dom';
import { useCalendarContext } from './Calendar';
import classes from './album.module.css';
import { useEffect, useState } from 'react';
import useCachingApi from '@hooks/useCachingApi';
import useIntersect from '@hooks/useIntersect';
import useApi from '@hooks/useApi';
import AlbumBody from './AlbumBody';
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
  const [isFirst, setIsFirst] = useState(true);
  const [albumArr, setAlbumArr] = useState<AlbumArrType[]>([]);
  const [page, setPage] = useState(1);
  const { trigger, result } = useCachingApi<AlbumApiResponse>({
    path: `/cumulative-record/month?month=${thisYear}-${returnWithZero(thisMonth)}-01&page=1`,
  });
  const navigate = useNavigate();

  const onClickCards = (val: string) => {
    console.log(val);
    navigate(
      `/record/${thisYear}-${returnWithZero(thisMonth)}-${returnWithZero(val)}`
    );
  };

  useEffect(() => {
    console.log({ isFirst });
    if (!isFirst) return; //처음이 아닐때 리턴
    trigger('', {
      onSuccess: (data) => {
        setAlbumArr((prev) => [...prev, ...data.data]);
      },
    }); //처음만 trigger
    setIsFirst(false);
  }, []);

  useEffect(() => {
    console.log({ isFirst });
  }, [isFirst]);

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    if (entry.isIntersecting) {
      console.log('isIntersecting');
      setIsLoading(true);
      observer.unobserve(entry.target);
      trigger('', {
        onSuccess: (data) => {
          setAlbumArr((prev) => [...prev, ...data.data]);
          setIsLoading(false);
        },
      });
      // await trigger({});
      observer.observe(entry.target);
      setPage((prev) => prev + 1);
    }
  };

  const { setTarget } = useIntersect({
    root: null,
    rootMargin: '100px',
    threshold: 1,
    onIntersect,
  });

  return (
    <div className={classes.wrapper}>
      {albumArr &&
        albumArr?.map((albumDay, idx) => (
          <AlbumBody
            key={`body-${idx}`}
            idx={idx}
            setTarget={setTarget}
            albumDay={albumDay}
            onClickCards={onClickCards}
            isLoading={isLoading}
          />
        ))}
    </div>
  );
};

export default Album;
