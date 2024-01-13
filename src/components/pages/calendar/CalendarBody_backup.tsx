import { ReactElement, SyntheticEvent, createElement } from "react";
import classes from "./calendarbody.module.css";
import { useCalendarContext } from "./Calendar";
import Album from "./Album";
import ButtonCommon from "@components/UI/ButtonCommon";

//필요한 전역 정보 나의 목표칼로리 (유저 정보에 포함)
const DUMMYCumulative_cal_Date = {
  existedDate: [1, 5, 9, 30, 29],
  totalCalData: [1200, 1100, 1500, 1000, 400],
};

const DUMMYtargetCalories = 1200;

const CalendarBody = () => {
  const {
    thisYear,
    thisMonth,
    selectedIndex,
    setSelectedIndex,
    setThisMonth,
    setThisYear,
    isAlbum,
  } = useCalendarContext();

  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const dayOfWeekArray = dayOfWeek.map((day, idx) => (
    <div className={classes["week-wrapper"]} key={`day-${idx}`}>
      <p className={`${classes["day-arr"]} r-big`}>{day}</p>
    </div>
  ));

  const onClickDate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickedElementId = Number(
      (e.target as HTMLDivElement).id.split("-")[1]
    );
    console.log(clickedElementId);
    setSelectedIndex(clickedElementId);
  };
  const getThisMonthArray = () => {
    const thisMonthTotal = new Date(thisYear, thisMonth, 0).getDate();
    const thisMonthFirstDay = new Date(thisYear, thisMonth - 1, 1).getDay();
    const monthArr: ReactElement[] = [];
    const totalCalNum = thisMonthTotal + thisMonthFirstDay > 35 ? 42 : 35;
    const getDayNumber = (idx: number): number => {
      return idx - thisMonthFirstDay + 1;
    };

    new Array(totalCalNum).fill(0).map((_, idx) => {
      //숫자 없는 것 //마지막에 넣어도 되지 않을까?
      //시작하는 요일, 당월 총 일수
      //시작하는 요일  + 당월 총일수 > 35 ? 6줄 : 5줄

      if (
        idx < thisMonthFirstDay ||
        idx >= thisMonthTotal + thisMonthFirstDay
      ) {
        return monthArr.push(
          <div
            key={`$cal-${idx}`}
            className={`${classes["cal-circle"]} b-small`}
          ></div>
          // createElement("div", {
          //   key: `$cal-${idx}`,
          //   className: `${classes["cal-circle"]} b-small`,
          // })
        );
      }
      //숫자 있는 것
      if (
        idx >= thisMonthFirstDay &&
        idx <= thisMonthTotal + thisMonthFirstDay
      ) {
        //해당 날짜에 입력한 칼로리 데이터 존재한다면
        if (
          DUMMYCumulative_cal_Date["existedDate"].includes(getDayNumber(idx))
        ) {
          const existedDateIndex = DUMMYCumulative_cal_Date[
            "existedDate"
          ].findIndex((el) => el === getDayNumber(idx));
          //목표 칼로리 비교 색깔 구분 적당 vs 과식
          const colorCls =
            DUMMYCumulative_cal_Date["totalCalData"][existedDateIndex] >
            DUMMYtargetCalories
              ? "over-eat"
              : "moderate";
          monthArr.push(
            <div className={classes["day-wrapper"]} key={`$cal-${idx}`}>
              <div
                className={`${classes[`${colorCls}`]} b-small`}
                id={`idx-${getDayNumber(idx)}`}
                onClick={onClickDate}
              >
                {getDayNumber(idx)}
              </div>
              <p
                className={`r-regular ${
                  colorCls === "over-eat"
                    ? classes[`font-over-eat`]
                    : classes[`font-moderate`]
                }`}
              >{`+${DUMMYCumulative_cal_Date["totalCalData"][existedDateIndex]}`}</p>
            </div>
          );
        } else {
          //칼로리 데이터 없는 날
          monthArr.push(
            <div className={classes["day-wrapper"]} key={`$cal-${idx}`}>
              <div
                id={`date-${getDayNumber(idx)}`}
                onClick={onClickDate}
                className={`${classes["cal-circle"]} b-small`}
              >
                {getDayNumber(idx)}
              </div>
            </div>
          );
        }
      }
      return monthArr;
    });
    return monthArr;
  };

  console.log(getThisMonthArray());
  console.log(getThisMonthArray()[6]);

  return (
    <>
      {!isAlbum && (
        <>
          <div className={classes["cla-body"]}>
            <div className={classes["cla-week"]}>{dayOfWeekArray}</div>
            <div className={classes["cla-week"]}>
              <div className={classes["cal-flex"]}>{getThisMonthArray()}</div>
            </div>
          </div>
          <ButtonCommon
            style={{ margin: "20px auto" }}
            variant="default-active"
            size="big"
            disabled={true}
          >
            선택한 날짜로 이동
          </ButtonCommon>
        </>
      )}
      {isAlbum && <Album />}
    </>
  );
};

export default CalendarBody;
