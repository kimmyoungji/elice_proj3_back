import { ReactElement, createContext, useContext, useState } from "react";

interface togglePropsType {
  children?: ReactElement;
}

type ToggleState = {
  on: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean | (() => boolean)>>;
};

const ToggleContext = createContext<ToggleState | undefined>(undefined);
const useToggleContext = () => {
  const state = useContext(ToggleContext);
  return state;
};

export const Toggle = ({ children }: togglePropsType) => {
  const [on, setIsOn] = useState(false);
  const value = {
    on,
    setIsOn,
  };

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
};

export const ToggleOn = ({ children }: togglePropsType) => {
  const { on } = useToggleContext();
  return on ? children : null;
};

export const ToggleOff = ({ children }: togglePropsType) => {
  const { on } = useToggleContext();
  return on ? null : children;
};

export const ToggleButton = ({ children }: togglePropsType) => {
  const { on, setIsOn } = useToggleContext();
  return (
    <label htmlFor="toggle" className="toggleSwitch">
      <span
        className="toggleButton"
        onClick={() => setIsOn((prev) => !prev)}
      ></span>
    </label>
  );
};
