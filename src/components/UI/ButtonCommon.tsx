import React, { ComponentPropsWithRef, ReactElement, useId, useImperativeHandle, useRef } from 'react';
import classes from './buttonCommon.module.css';
import { getClassName } from '@utils/getClasses';

type ButtonPropsType = {
  children?: string | ReactElement | number;
  className?: string;
  onClickBtn?: () => void;
} & ComponentPropsWithRef<'button'>;

const getClassName = (className: any | undefined) => {
  const classArray: string[] | undefined = className?.split(' ');
  return typeof classArray === 'object'
    ? classArray.map((classN) => classN && classes[classN]).join(' ')
    : className
    ? classes[className]
    : '';
};

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

  const buttonClass = getClassName(className);

  return (
    <button id={id} className={`${classes.button} ${buttonClass}`} onClick={onClickBtn} ref={buttonRef}>
      {children}
    </button>
  );
});

export default ButtonCommon;
