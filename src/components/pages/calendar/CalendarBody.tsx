import { ReactElement } from "react";
import classes from "./calendarbody.module.css";
import { useCalendarContext } from "./Calendar";

const CalendarBody = () => {
  const { yearMonth: selectedYearMonth } = useCalendarContext();
  //비어있을 수 없음 초깃값 이번해.이번달

  const [thisYear, thisMonth] = selectedYearMonth.split(".");
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const dayOfWeekArray = dayOfWeek.map((day, idx) => (
    <div className={classes["day-wrapper"]} key={`day-${idx}`}>
      <p className={`${classes["day-arr"]} r-big`}>{day}</p>
    </div>
  ));

  const getThisMonthArray = () => {
    const thisMonthTotal = new Date(
      parseInt(thisYear),
      parseInt(thisMonth),
      0
    ).getDate();
    const thisMonthFirstDay = new Date(
      parseInt(thisYear),
      parseInt(thisMonth) - 1,
      1
    ).getDay();
    const arr: ReactElement[] = [];
    const totalCalNum = thisMonthTotal + thisMonthFirstDay > 35 ? 42 : 35;
    new Array(totalCalNum).fill(0).map((_, idx) => {
      if (
        idx < thisMonthFirstDay ||
        idx >= thisMonthTotal + thisMonthFirstDay
      ) {
        return arr.push(
          <div
            key={`$cal-${idx}`}
            className={`${classes["cal-circle"]} b-small`}
          ></div>
        );
      }
      if (
        idx >= thisMonthFirstDay &&
        idx <= thisMonthTotal + thisMonthFirstDay
      ) {
        return arr.push(
          <div
            key={`$cal-${idx}`}
            className={`${classes["cal-circle"]} b-small`}
          >
            {idx - thisMonthFirstDay + 1}
          </div>
        );
      }
      return arr;
    });
    return arr;
  };
  console.log(getThisMonthArray());

  return (
    <div className={classes["cla-body"]}>
      <div className={classes["cla-week"]}>{dayOfWeekArray}</div>
      <div className={classes["cla-week"]}>
        <div className={classes["cal-flex"]}>{getThisMonthArray()}</div>
      </div>
    </div>
  );
};

export default CalendarBody;

// 좌 37 상 14
