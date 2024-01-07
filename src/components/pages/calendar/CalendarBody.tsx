import { ReactElement, useId, useState } from 'react';
import classes from './calendarbody.module.css';
import { useCalendarContext } from './Calendar';

const CalendarBody = () => {
  const { yearMonth: selectedYearMonth } = useCalendarContext();
  //비어있을 수 없음 초깃값 이번해.이번달

  const [thisYear, thisMonth] = selectedYearMonth.split('-');
  console.log({ thisYear, thisMonth });
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const dayOfWeekArray = dayOfWeek.map((day) => (
    <div className={classes['day-wrapper']}>
      <p className={`${classes['day-arr']} r-big`}>{day}</p>
    </div>
  ));

  const getThisMonthArray = () => {
    const thisMonthTotal = new Date(parseInt(thisYear), parseInt(thisMonth), 0).getDate();
    const thisMonthFirstDay = new Date(parseInt(thisYear), parseInt(thisMonth) - 1, 1).getDay(); //선택된 첫번째 날의 요일
    //1
    //그럼 한개만큼만 ""를 그리면 됨
    console.log(thisMonthTotal);
    const arr: ReactElement[] = [];
    new Array(35).fill(0).map((_, idx) => {
      if (idx < thisMonthFirstDay || idx > thisMonthFirstDay + thisMonthTotal - 1) {
        arr.push(<div>{''}</div>);
      }
      if (idx > thisMonthFirstDay && idx < thisMonthTotal) {
        arr.push(<div>{1 + idx - thisMonthFirstDay - 1}</div>);
      }
      return arr;
    });
    return arr;
  };
  console.log(getThisMonthArray());
  const dateId = useId();
  //이번달의 첫날 요일 구하기
  //이번달의 총 날짜 구하기
  //총 날짜만큼 어레이 만들어서 element사이에 넣기
  return (
    <div className={classes['cla-body']}>
      <div className={classes['cla-week']}>{dayOfWeekArray}</div>
      <div className={classes.display}>{getThisMonthArray()}</div>
    </div>
  );
};

export default CalendarBody;

// 좌 37 상 14
