//
import { useId } from "react";
import { Toggle, ToggleButton } from "@components/UI/Toggle";
import { Dropdown } from "./dropdown/Dropdown";
import DropdownButton from "./dropdown/DropdownButton";
import DropdownItem from "./dropdown/DropdownItem";
import { useCalendarContext } from "./Calendar";

const CalendarHeader = () => {
  const { yearMonth, setIsAlbum } = useCalendarContext();
  const itemId = useId();
  const handleChange = (value: string) => {
    //선택한 날짜를 context에 설정
    console.log(value);
  };

  const onChangeToggle = (value: boolean) => {
    setIsAlbum(value);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "20px",
        height: "40px",
        padding: "1px",
      }}
    >
      <Dropdown onChange={handleChange}>
        <DropdownButton>{yearMonth.split("-").join(". ")}</DropdownButton>
        {/* item은 현재 날짜에서 앞뒤로????? 인피니티 스크롤???...*/}
        <DropdownItem id={itemId}>aasasd</DropdownItem>
      </Dropdown>
      <Toggle onChangeToggle={onChangeToggle}>
        <ToggleButton />
      </Toggle>
    </div>
  );
};

export default CalendarHeader;
