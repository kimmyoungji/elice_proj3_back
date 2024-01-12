import { ReactElement, ReactNode } from "react";
import { useCalendarContext } from "./Calendar";
//선택하면 나타나게, 월을 선택하면 사라지게.

interface MonthTogglePropsType {
  children?: ReactNode[] | string;
}

const MonthToggle = ({ children }: MonthTogglePropsType) => {
  // const { monthOn } = useCalendarContext();

  return <div>{children}</div>;
};

export default MonthToggle;
