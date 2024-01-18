import CarlendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarTitle from './CalendarTitle';
import { createContext, useEffect } from 'react';
import { Dispatch, ReactElement, useContext, useState } from 'react';
import getDates from '../../../utils/getDates';
import Toast from '@components/UI/Toast';
import ToastText from '@components/UI/ToastText';
import ButtonCommon from '@components/UI/ButtonCommon';
import InputNumber from '@components/UI/InputNumber';

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
      showSelect: boolean;
      setShowSelect: Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

const CalendarProvider = ({
  children,
}: {
  children: ReactElement[] | ReactElement;
}) => {
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
  const [showSelect, setShowSelect] = useState(false);

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
        showSelect,
        setShowSelect,
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
      'useCalendarContext는 CalendarProvider내부에서만 사용할 수 있습니다'
    );
  }
  return context;
};

const Calendar = () => {
  const [showToast, setShowToast] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const showMeToast = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShowToast(true);
    console.log({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    console.log({ x: e.clientX, y: e.clientY });
    setPosition((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
  };
  const [value, setValue] = useState(1);
  const [value2, setValue2] = useState(1);

  const valueChangeFn: React.ChangeEventHandler<HTMLInputElement> = (value) => {
    value && setValue(Number(value));
  };
  const valueChangeFn2: React.ChangeEventHandler<HTMLInputElement> = (
    value
  ) => {
    value2 && setValue2(Number(value));
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <>
      <ButtonCommon onClickBtn={showMeToast}>Button</ButtonCommon>
      <Toast show={showToast} setShow={setShowToast} position={position}>
        <ToastText>hello</ToastText>
      </Toast>

      <InputNumber
        value={value}
        onValueChange={valueChangeFn}
        maxiumValue={23}
      />
      <InputNumber
        value={value2}
        onValueChange={valueChangeFn2}
        maxiumValue={23}
      />

      <CalendarProvider>
        <CarlendarHeader />
        <CalendarBody />
      </CalendarProvider>
    </>
  );
};

export default Calendar;
