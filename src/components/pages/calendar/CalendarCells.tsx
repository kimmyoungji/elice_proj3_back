import classes from './calendarbody.module.css';

interface CalendarCellsProps {
  thisMonthFirstDay: number;
  thisMonthTotal: number;
  idx: number;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  Cumulative_cal_DateArr: { existedDate: number[]; totalCalData: number[] };
  targetCalories: number;
}

const CalendarCells = ({
  thisMonthFirstDay,
  thisMonthTotal,
  idx,
  selectedIndex,
  setSelectedIndex,
  targetCalories,
  Cumulative_cal_DateArr,
}: CalendarCellsProps) => {
  const getDayNumber = (idx: number): number => {
    return idx - thisMonthFirstDay + 1;
  };
  const onClickDate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickedElementId = Number(
      (e.target as HTMLDivElement).id.split('-')[1]
    );
    //기존에 index가 동일하면 삭제
    setSelectedIndex((prev) => {
      return prev === clickedElementId ? NaN : clickedElementId;
    });
  };
  const existedDateIndex = Cumulative_cal_DateArr['existedDate'].findIndex(
    (el) => el === getDayNumber(idx)
  );
  //목표 칼로리 비교 색깔 구분 적당 vs 과식

  //상태에 따른 className
  const colorCls =
    Cumulative_cal_DateArr['totalCalData'][existedDateIndex] > targetCalories
      ? 'over-eat'
      : 'moderate';
  const colorFonts =
    colorCls === 'over-eat'
      ? `${classes[`font-over-eat`]}`
      : classes[`font-moderate`];
  const selectedCls =
    selectedIndex === idx - thisMonthFirstDay + 1
      ? ` ${classes['selected']}`
      : ``;
  const selectedFonts =
    selectedCls !== '' ? ` ${classes['font-selected']}` : '';
  return (
    <div
      key={`$cal-${idx}`}
      className={
        idx >= thisMonthFirstDay && idx < thisMonthTotal + thisMonthFirstDay
          ? `${classes['day-wrapper']} b-small`
          : ` ${classes['cal-circle']} b-small`
      }
    >
      <div
        key={`$date-${idx}`}
        className={
          Cumulative_cal_DateArr['existedDate'].includes(getDayNumber(idx))
            ? `${classes[`${colorCls}`]} b-small` + selectedCls
            : `${classes['cal-circle']} b-small` + selectedCls
        }
        id={
          idx >= thisMonthFirstDay && idx < thisMonthTotal + thisMonthFirstDay
            ? `idx-${getDayNumber(idx)}`
            : undefined
        }
        onClick={onClickDate}
      >
        {idx >= thisMonthFirstDay &&
          idx < thisMonthTotal + thisMonthFirstDay &&
          getDayNumber(idx)}
      </div>
      {Cumulative_cal_DateArr['existedDate'].includes(getDayNumber(idx)) && (
        <p
          key={`$p-${idx}`}
          className={`r-regular ${colorFonts + selectedFonts}`}
        >
          {`+${Cumulative_cal_DateArr['totalCalData'][existedDateIndex]}`}
        </p>
      )}
    </div>
  );
};

export default CalendarCells;
