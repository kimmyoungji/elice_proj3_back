import { DownArrowLight } from '@assets/DownArrowLight';
import styles from '@components/pages/home/home.module.css';
import { useEffect, useState } from 'react';
import Calorie from './Calorie';
import MealCard from './MealCard';
import Nutrients from './Nutrients';

const week = ['일', '월', '화', '수', '목', '금', '토'];

const DUMMYdayData = {
  totalCalories: 845,
  recommendCalories: 1200,
  totalNutrient: { carbohydrates: 240, proteins: 20, fat: 23, dietaryFiber: 2 },
  recommendNutrient: {
    carbohydrates: 200,
    proteins: 80,
    fat: 50,
    dietaryFiber: 4,
  },
  dateArr: [
    ['아침', 400, '/images/home_ex1.png'],
    ['점심', 350, '/images/home_ex2.png'],
    ['저녁', 0, undefined],
    ['간식', 0, undefined],
  ],
};

const now = new Date();
const nowYear = now.getFullYear();
const nowMonth = now.getMonth();
const nowDate = now.getDate();
const nowDay = now.getDay();

const currentLastDayIndex = new Date(nowYear, nowMonth + 1, 0).getDate(); // 이번달 마지막 날짜
const lastLastDayIndex = new Date(nowYear, nowMonth, 0).getDate(); // 저번달 마지막 날짜
const currentFirstDayIndex = new Date(nowYear, nowMonth, 1).getDate(); // 이번달 첫번째 날
const totalWeek = Math.ceil((lastLastDayIndex + currentFirstDayIndex) / 7); // 이번달 전체 주차
const nowWeek = Math.ceil((nowDate + currentFirstDayIndex) / 7); // 이번달 지금 주차

const Home = () => {
  const [selectedWeek, setSelectedWeek] = useState(nowWeek);
  const [selectedDay, setSelectedDay] = useState(nowDay);
  const [selectedNow, setSelectedNow] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [currentWeekArr, setCurrentWeekArr] = useState<number[]>([]);

  const handleClick = (idx: number) => {
    setSelectedDay(idx);
    if (idx === nowDay) {
      setSelectedNow(true);
    } else {
      setSelectedNow(false);
    }
    // 해당 일자 api 콜해서 daydata 바꿔주기
  };

  const onToggle = () => setIsOpen(!isOpen);

  // 드롭다운에서 주차 선택하면 주차 그리기
  const onClickWeek = (week: number) => {
    setSelectedWeek(week);
  };

  const weekly = () => {
    const firstDate = (selectedWeek - 1) * 7; // 해당주차 일요일 날짜
    const newWeekArr = [];

    for (let i = 0; i < 7; i++) {
      let date = firstDate + i;
      //마지막 데이터가 다음월이거나 처음 데이터가 전월인 경우
      if (date > currentLastDayIndex || date <= 0) {
        date = 0;
      }
      newWeekArr.push(date);
    }
    setCurrentWeekArr(newWeekArr);
    setIsOpen(false);
  };

  useEffect(() => {
    weekly();
  }, [selectedWeek]);

  return (
    <div className={styles.home_wrapper}>
      <div className={`${styles.select_wrapper} b-small`}>
        <p>
          {nowYear}.{String(nowMonth + 1).padStart(2, '0')}
        </p>
        <div onClick={onToggle} className={styles.dropdown_wrapper}>
          <div className={styles.dropdown_line}>
            {selectedWeek}주차 <DownArrowLight />
          </div>

          {isOpen && (
            <div className={styles.dropdown}>
              {new Array(totalWeek).fill(null).map((_, idx) => (
                <div
                  key={`week-${idx}`}
                  onClick={() => onClickWeek(idx + 1)}
                  className={idx + 1 === selectedWeek ? styles.active : ''}
                >
                  {idx + 1}주차
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.week}>
        {currentWeekArr.map((date, idx) => (
          <div className={styles.date_wrapper} key={idx}>
            {idx === 0 ? (
              <div className={`${styles.sunday} r-small`}>{week[idx]}</div>
            ) : idx === 6 ? (
              <div className={`${styles.saturday} r-small`}>{week[idx]}</div>
            ) : (
              <div className={`${styles.day} r-small`}>{week[idx]}</div>
            )}
            <div className={styles.date} onClick={() => handleClick(idx)}>
              {date === 0 ? (
                <></>
              ) : selectedDay === idx ? (
                <div className={`${styles.selected} r-large`}>{date}</div>
              ) : (
                <>{date}</>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.today}>
        <p className={`${styles.title} b-regular`}>
          {selectedNow && currentWeekArr[selectedDay] === nowDate
            ? '오늘의'
            : `${week[selectedDay]}요일`}{' '}
          식단
        </p>
        <Calorie
          totalCalories={DUMMYdayData.totalCalories}
          recommendCalories={DUMMYdayData.recommendCalories}
        />
        <Nutrients
          totalNutrient={DUMMYdayData.totalNutrient}
          recommendNutrient={DUMMYdayData.recommendNutrient}
        />
        <MealCard
          dateArr={
            DUMMYdayData.dateArr as [string, number, string | undefined][]
          }
        />
      </div>
    </div>
  );
};

export default Home;
