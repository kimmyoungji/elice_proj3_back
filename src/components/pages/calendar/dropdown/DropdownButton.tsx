import { useEffect } from 'react';
import { useDropdownContext } from './Dropdown';

type DropdownButtonProps = {
  children: string;
};

const DropdownButton = ({ children }: DropdownButtonProps) => {
  const { handleBtnText } = useDropdownContext();

  //텍스트를 btnText에 넣어줌
  //버튼은 아무 스타일링도 갖지 않음!
  //글씨를 화면에 보여줄 뿐
  useEffect(() => {
    handleBtnText(children);
  }, []);

  return <></>;
};

export default DropdownButton;
