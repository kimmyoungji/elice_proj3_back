import { useEffect } from "react";
import { useDropdownContext } from "./Dropdown";

type DropdownButtonProps = {
  children: string;
};

const DropdownButton = ({ children }: DropdownButtonProps) => {
  const { handleBtnText } = useDropdownContext();

  useEffect(() => {
    handleBtnText(children);
  }, []);

  return <></>;
};

export default DropdownButton;
