import ButtonCommon from '@components/UI/ButtonCommon';
import CarlendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarTitle from './CalendarTitle';
import { createContext } from 'react';
import { Dispatch, ReactElement, useContext, useState } from 'react';
import getDates from '../../../utils/getDates';
import InputCommon from '@components/UI/InputCommon';

const CalendarContext = createContext<
  { yearMonth: string; setYearMonth: Dispatch<React.SetStateAction<string>> } | undefined
>(undefined);

const CalendarProvider = ({ children }: { children: ReactElement[] | ReactElement }) => {
  // const { thisYear, thisMonth } = getDates();
  const { thisYear, thisMonth } = { thisYear: 2024, thisMonth: 6 };
  const initialYearMonth = `${thisYear}.${thisMonth}`;
  console.log(initialYearMonth);
  //형식 2024.01
  const [yearMonth, setYearMonth] = useState(initialYearMonth);
  return <CalendarContext.Provider value={{ yearMonth, setYearMonth }}>{children}</CalendarContext.Provider>;
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendarContext는 CalendarProvider내부에서만 사용할 수 있습니다');
  }
  return context;
};

const Calendar = () => {
  return (
    <>
      <CalendarTitle />
      <CalendarProvider>
        <CarlendarHeader />
        <CalendarBody />
        {/* <InputCommon /> */}
        <ButtonCommon className='button big b-regular disabled'>선택한 날짜로 이동</ButtonCommon>
      </CalendarProvider>
    </>
  );
};

export default Calendar;
