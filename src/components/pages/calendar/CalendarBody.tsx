import { ReactElement } from 'react';
import classes from './calendarbody.module.css';
import { useCalendarContext } from './Calendar';

const CalendarBody = () => {
  const { yearMonth: selectedYearMonth } = useCalendarContext();
  //비어있을 수 없음 초깃값 이번해.이번달

  const [thisYear, thisMonth] = selectedYearMonth.split('.');
  console.log({ thisYear, thisMonth });
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const dayOfWeekArray = dayOfWeek.map((day) => (
    <div className={classes['day-wrapper']}>
      <p className={`${classes['day-arr']} r-big`}>{day}</p>
    </div>
  ));

  const getThisMonthArray = () => {
    const thisMonthTotal = new Date(parseInt(thisYear), parseInt(thisMonth), 0).getDate();
    const thisMonthFirstDay = new Date(parseInt(thisYear), parseInt(thisMonth) - 1, 1).getDay();
    const arr: ReactElement[] = [];
    new Array(35).fill(0).map((_, idx) => {
      if (idx < thisMonthFirstDay || idx > thisMonthFirstDay + thisMonthTotal) {
        arr.push(<div className={classes['cal-circle']}>{''}</div>);
      }
      if (idx > thisMonthFirstDay && idx <= thisMonthTotal + 1) {
        arr.push(<div className={classes['cal-circle']}>{1 + idx - thisMonthFirstDay - 1}</div>);
      }
      return arr;
    });
    return arr;
  };
  console.log(getThisMonthArray());

  return (
    <div className={classes['cla-body']}>
      <div className={classes['cla-week']}>{dayOfWeekArray}</div>
      <div className={classes['cal-flex']}>{getThisMonthArray()}</div>
    </div>
  );
};

export default CalendarBody;

// 좌 37 상 14
