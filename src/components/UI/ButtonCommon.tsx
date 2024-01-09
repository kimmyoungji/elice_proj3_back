import React, { ComponentPropsWithRef, ReactElement, useId, useImperativeHandle, useRef } from 'react';
import classes from './buttonCommon.module.css';
import { useButtonProps } from '@hooks/useButtonProps';

type ButtonVariant = 'default' | 'active' | 'default-active' | 'validated' | 'error';

export type CommonSizeType = 'large' | 'big' | 'medium' | 'med-small' | 'small' | 'ssmall' | 'tiny';

type ButtonPropsType = {
  children?: string | ReactElement | number;
  className?: string;
  onClickBtn?: ((event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void) | undefined;
  href?: string;
  variant?: ButtonVariant;
  size?: CommonSizeType;
  disabled?: boolean;
  active?: boolean;
} & ComponentPropsWithRef<'button'>;

type getClassNameType = { variant?: ButtonVariant; disabled?: boolean; active?: boolean; size?: CommonSizeType };

const getClassNames = (...params: getClassNameType[]) => {
  return params.reduce((acc, cur) => {
    if (cur) acc.push(cur);
    return acc;
  }, []);
};

const getClassName = (classNames: string | undefined, { variant, disabled, active, size }: getClassNameType) => {
  getClassNames(variant, disabled, active, size);
  const classArray: string[] | undefined = classNames?.split(' ');
  return typeof classArray === 'object'
    ? classArray.map((classN) => classN && classes[classN]).join(' ')
    : classNames
    ? classes[classNames]
    : '';
};

const ButtonCommon = React.forwardRef(
  (
    { children, className, size, disabled, active, variant = 'default', href, onClickBtn, ...props }: ButtonPropsType,
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const id = useId();

    const [buttonProps, { tagName: Component }] = useButtonProps({
      href,
      onClickBtn,
      ...props,
    });

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

    const buttonClass = getClassName(className, { variant, disabled, active, size });

    return (
      <>
        {/* {href && (
        <a href={href} id={id} className={`${classes.button} ${buttonClass}`} onClick={onClickBtn}>
          {children}
        </a>
      )}
      {!href && (
        <button id={id} className={`${classes.button} ${buttonClass}`} onClick={onClickBtn} ref={buttonRef}>
          {children}
        </button>
      )} */}
        <Component {...buttonProps} className={buttonClass}>
          {children}
        </Component>
      </>
    );
  }
);

export default ButtonCommon;
