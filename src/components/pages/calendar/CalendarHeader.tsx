import { Toggle, ToggleButton } from '@components/UI/Toggle';
import { useCalendarContext } from './Calendar';
import MonthToggle from './MonthToggle';
import CalendarMonth from './CalendarMonth';
import classes from './calendarHeader.module.css';

const CalendarHeader = () => {
  const { thisYear, thisMonth, setIsAlbum } = useCalendarContext();
  // const itemId = useId();
  const handleView = (value: string) => {
    //선택한 날짜를 context에 설정
    console.log(value);
  };

  const onChangeToggle = (value: boolean) => {
    setIsAlbum(value);
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <MonthToggle>
          <CalendarMonth />
        </MonthToggle>
      </div>

      <Toggle onChangeToggle={onChangeToggle}>
        <ToggleButton />
      </Toggle>
    </div>
  );
};

export default CalendarHeader;
