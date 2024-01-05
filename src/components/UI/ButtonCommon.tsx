import React, { ComponentPropsWithRef, ReactElement, useId, useImperativeHandle, useRef } from 'react';
import classes from './buttonCommon.module.css';

type ButtonPropsType = {
  children?: string | ReactElement | number;
  className?: string;
  onClickBtn?: () => void;
} & ComponentPropsWithRef<'button'>;

const ButtonCommon = React.forwardRef(({ className, children, onClickBtn }: ButtonPropsType, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          buttonRef.current?.focus();
        },
      };
    },
    []
  );

  const classArray = className?.split(' ');

  const buttonClass = classArray
    ? classArray.map((classN) => classes[classN]).join(' ')
    : className
    ? classes[className]
    : '';
  console.log(buttonClass);
  console.log(className);

  return (
    <button id={id} className={`${classes.button} ${buttonClass}`} onClick={onClickBtn} ref={buttonRef}>
      {children}
    </button>
  );
});

export default ButtonCommon;
