import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import classes from './toggle.module.css';

interface togglePropsType {
  children?: ReactNode | ReactNode[];
}

type ToggleState = {
  on: boolean;
  setValue: (value: React.SetStateAction<boolean>) => void;
};

const ToggleContext = createContext<ToggleState | null>(null);
const useToggleContext = (ToggleContext: any): any => {
  if (ToggleContext === undefined) {
    throw new Error('useToggleContext must be used within a ToggleProvider');
  }
  const state = useContext(ToggleContext);
  return state;
};

export const Toggle = ({ children }: togglePropsType) => {
  const [on, setIsOn] = useState(false);
  const value = useMemo(
    () => ({
      on: on,
      setValue: setIsOn,
    }),
    [on]
  );

  return <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>;
};

export const ToggleOn = ({ children }: any) => {
  const { on } = useToggleContext(ToggleContext);
  return on ? children : null;
};

export const ToggleOff = ({ children }: any) => {
  const { on } = useToggleContext(ToggleContext);
  return on ? null : children;
};

export const ToggleButton = ({ children }: togglePropsType) => {
  const { on, setValue } = useToggleContext(ToggleContext);
  const btnClassName = ['toggle-btn', on ? 'toggle-btn-on' : 'toggle-btn-off'];
  const classNames = btnClassName.map((cls) => classes[cls]).join(' ');

  return (
    <label className={classes['toggle-label']}>
      <input
        className={classes[`toggle-input`]}
        type='checkbox'
        checked={on}
        onChange={() => {}}
        onClick={() => setValue((prev: any) => !prev)}
        data-testid='toggle-input'
      />
      <div className={classes.toggles}>
        <div className={classes['toggle-text']}>
          <div>달력</div>
          <div>앨범</div>
        </div>
        <span className={classNames} />
      </div>
    </label>
  );
};
