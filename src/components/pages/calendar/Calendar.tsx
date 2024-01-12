import ButtonCommon from "@components/UI/ButtonCommon";
import CarlendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import CalendarTitle from "./CalendarTitle";
import { createContext } from "react";
import { Dispatch, ReactElement, useContext, useState } from "react";
import getDates from "../../../utils/getDates";
import InputCommon from "@components/UI/InputCommon";

const CalendarContext = createContext<
  | {
      isAlbum: boolean;
      setIsAlbum: Dispatch<React.SetStateAction<boolean>>;
      thisYear: number;
      setThisYear: Dispatch<React.SetStateAction<number>>;
      thisMonth: number;
      setThisMonth: Dispatch<React.SetStateAction<number>>;
      thisDay: number;
      setThisDay: Dispatch<React.SetStateAction<number>>;
      selectedIndex: number;
      setSelectedIndex: Dispatch<React.SetStateAction<number>>;
    }
  | undefined
>(undefined);

const CalendarProvider = ({
  children,
}: {
  children: ReactElement[] | ReactElement;
}) => {
  //초깃값은 getDates로 받아옴
  //그다음은 선택된 값으로 변경되어야 함.
  //변경된 것을 감지?

  //thisYear thisMonth 가져오거나
  //선택하거나

  const {
    thisYear: yearNow,
    thisMonth: monthNow,
    thisDay: dayNow,
  } = getDates();

  const [thisYear, setThisYear] = useState(yearNow);
  const [thisMonth, setThisMonth] = useState(Number(monthNow));
  const [thisDay, setThisDay] = useState(dayNow);
  const [isAlbum, setIsAlbum] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(NaN);

  return (
    <CalendarContext.Provider
      value={{
        thisYear,
        setThisYear,
        thisMonth,
        setThisMonth,
        thisDay,
        setThisDay,
        selectedIndex,
        setSelectedIndex,
        isAlbum,
        setIsAlbum,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error(
      "useCalendarContext는 CalendarProvider내부에서만 사용할 수 있습니다"
    );
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
      </CalendarProvider>
    </>
  );
};

export default Calendar;
