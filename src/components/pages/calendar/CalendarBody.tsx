import { ReactElement } from "react";
import classes from "./calendarbody.module.css";
import { useCalendarContext } from "./Calendar";
import Album from "./Album";

//필요한 전역 정보 나의 목표칼로리 (유저 정보에 포함)
const DUMMYCumulative_cal_Date = {
  existedDate: [1, 5, 9, 30, 29],
  totalCalData: [1200, 1100, 1500, 1000, 400],
};

const DUMMYtargetCalories = 1200;

const CalendarBody = () => {
  const { yearMonth: selectedYearMonth, isAlbum } = useCalendarContext();

  const [thisYear, thisMonth] = selectedYearMonth.split(".");
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const dayOfWeekArray = dayOfWeek.map((day, idx) => (
    <div className={classes["week-wrapper"]} key={`day-${idx}`}>
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
    const monthArr: ReactElement[] = [];
    const totalCalNum = thisMonthTotal + thisMonthFirstDay > 35 ? 42 : 35;

    new Array(totalCalNum).fill(0).map((_, idx) => {
      //숫자 없는 것
      if (
        idx < thisMonthFirstDay ||
        idx >= thisMonthTotal + thisMonthFirstDay
      ) {
        return monthArr.push(
          <div
            key={`$cal-${idx}`}
            className={`${classes["cal-circle"]} b-small`}
          ></div>
        );
      }
      //숫자 있는 것
      if (
        idx >= thisMonthFirstDay &&
        idx <= thisMonthTotal + thisMonthFirstDay
      ) {
        //해당 날짜에 입력한 칼로리 데이터 존재한다면
        if (
          DUMMYCumulative_cal_Date["existedDate"].includes(
            idx - thisMonthFirstDay + 1
          )
        ) {
          const extedDateIndex = DUMMYCumulative_cal_Date[
            "existedDate"
          ].findIndex((el) => el === idx - thisMonthFirstDay + 1);
          //목표 칼로리 비교 색깔 구분 적당 vs 과식
          const colorCls =
            DUMMYCumulative_cal_Date["totalCalData"][extedDateIndex] >
            DUMMYtargetCalories
              ? "over-eat"
              : "moderate";
          monthArr.push(
            <div className={classes["day-wrapper"]} key={`$cal-${idx}`}>
              <div className={`${classes[`${colorCls}`]} b-small`}>
                {idx - thisMonthFirstDay + 1}
              </div>
              <p
                className={`r-regular ${
                  colorCls === "over-eat"
                    ? classes[`font-over-eat`]
                    : classes[`font-moderate`]
                }`}
              >{`+${DUMMYCumulative_cal_Date["totalCalData"][extedDateIndex]}`}</p>
            </div>
          );
        } else {
          //칼로리 데이터 없는 날
          monthArr.push(
            <div className={classes["day-wrapper"]} key={`$cal-${idx}`}>
              <div className={`${classes["cal-circle"]} b-small`}>
                {idx - thisMonthFirstDay + 1}
              </div>
            </div>
          );
        }
      }
      return monthArr;
    });
    return monthArr;
  };

  return (
    <>
      {!isAlbum && (
        <div className={classes["cla-body"]}>
          <div className={classes["cla-week"]}>{dayOfWeekArray}</div>
          <div className={classes["cla-week"]}>
            <div className={classes["cal-flex"]}>{getThisMonthArray()}</div>
          </div>
        </div>
      )}
      {isAlbum && <Album />}
    </>
  );
};

export default CalendarBody;
