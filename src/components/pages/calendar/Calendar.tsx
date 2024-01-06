import ButtonCommon from '@components/UI/ButtonCommon';
import CarlendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarTitle from './CalendarTitle';

const Calendar = () => {
  return (
    <>
      <CalendarTitle />
      <CarlendarHeader />
      <CalendarBody />
      <ButtonCommon className='button big b-regular disabled'>선택한 날짜로 이동</ButtonCommon>
    </>
  );
};

export default Calendar;
