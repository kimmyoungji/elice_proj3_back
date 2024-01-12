import { ReactElement, createElement } from "react";
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
    //기존에 index가 동일하면 삭제
    setSelectedIndex((prev) => {
      return prev === clickedElementId ? NaN : clickedElementId;
    });
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
      const existedDateIndex = DUMMYCumulative_cal_Date[
        "existedDate"
      ].findIndex((el) => el === getDayNumber(idx));
      //목표 칼로리 비교 색깔 구분 적당 vs 과식

      //상태에 따른 className
      const colorCls =
        DUMMYCumulative_cal_Date["totalCalData"][existedDateIndex] >
        DUMMYtargetCalories
          ? "over-eat"
          : "moderate";
      const colorFonts =
        colorCls === "over-eat"
          ? `${classes[`font-over-eat`]}`
          : classes[`font-moderate`];
      const selectedCls =
        selectedIndex === idx - thisMonthFirstDay + 1
          ? ` ${classes["selected"]}`
          : ``;
      const selectedFonts =
        selectedCls !== "" ? ` ${classes["font-selected"]}` : "";

      monthArr.push(
        createElement("div", {
          key: `$cal-${idx}`,
          className:
            idx >= thisMonthFirstDay && idx < thisMonthTotal + thisMonthFirstDay
              ? `${classes["day-wrapper"]} b-small` + selectedCls
              : ` ${classes["cal-circle"]} b-small` + selectedCls,
          children: [
            //날짜에 맞는 idx일때만 숫자를 넣음
            createElement("div", {
              key: `$date-${idx}`,
              className:
                //칼로리데이터 존재하는 날짜의 인덱스
                DUMMYCumulative_cal_Date["existedDate"].includes(
                  getDayNumber(idx)
                )
                  ? `${classes[`${colorCls}`]} b-small`
                  : `${classes["cal-circle"]} b-small`,
              //id는 날짜범위 내에서만
              id:
                idx >= thisMonthFirstDay &&
                idx < thisMonthTotal + thisMonthFirstDay
                  ? `idx-${getDayNumber(idx)}`
                  : null,
              onClick: onClickDate,
              children:
                idx >= thisMonthFirstDay &&
                idx < thisMonthTotal + thisMonthFirstDay &&
                getDayNumber(idx),
            }),
            //데이터 존재하는 idx에서만
            DUMMYCumulative_cal_Date["existedDate"].includes(
              getDayNumber(idx)
            ) &&
              createElement("p", {
                key: `$p-${idx}`,
                className: `r-regular ${colorFonts + selectedFonts}`,
                children: `+${DUMMYCumulative_cal_Date["totalCalData"][existedDateIndex]}`,
              }),
          ],
        })
      );
      return monthArr;
    });
    return monthArr;
  };

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
            disabled={!selectedIndex}
            href={`/record/${selectedIndex}`}
          >
            {DUMMYCumulative_cal_Date["existedDate"].includes(selectedIndex)
              ? "기록 보러 가기"
              : "기록 추가하러 가기"}
          </ButtonCommon>
        </>
      )}
      {isAlbum && <Album />}
    </>
  );
};

export default CalendarBody;
