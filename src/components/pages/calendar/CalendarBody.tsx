import { useId, useState } from 'react';
import classes from './calendarbody.module.css';

const CalendarBody = () => {
  //이번달 혹은 선택한 달
  //선택한 달을 받지 못하면 지금 달을 표시
  let today = new Date();
  const [thisMonth, setThisMonth] = useState(today.getMonth());
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeekArray = dayOfWeek.map((day) => (
    <div className={classes['day-wrapper']}>
      <p className={`${classes['day-arr']} r-big`}>{day}</p>
    </div>
  ));

  const thisDayOfWeek = new Date();
  const thisMonthArray = () => {
    // thisMonthArray.push(dayOfWeekArray)
  };
  const dateId = useId();
  //이번달의 첫날 요일 구하기
  //이번달의 총 날짜 구하기
  //총 날짜만큼 어레이 만들어서 element사이에 넣기

  const thisMonthDay = () => {};
  const thisMonthFirstDay = () => {};

  let month = today.getMonth();
  let day = today.getDay();
  console.log('today is?' + day);

  const dayArray = new Array(7).fill(0).map((_, idx) => <div>{idx + 1}</div>);
  console.log(dayArray);

  return (
    <div className={classes['cla-body']}>
      <div className={classes['cla-week']}>{dayOfWeekArray}</div>
      <div className={classes.display}>
        {new Array(5).fill(0).map((_, idx) => (
          <div key={dateId}>{dayArray}</div>
        ))}
      </div>
    </div>
  );
};

export default CalendarBody;

// 좌 37 상 14
