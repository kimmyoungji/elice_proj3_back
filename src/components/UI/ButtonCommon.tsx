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

interface getClassNameType {
  variant?: ButtonVariant;
  disabled?: boolean;
  active?: boolean;
  size?: CommonSizeType;
}

const getClassNames = (...params: getClassNameType[]): string[] | string | undefined => {
  let cls: string[] | undefined;
  console.log(params);
  if (params.length > 0) {
    cls = params.reduce((acc: string[], cur: getClassNameType) => {
      console.log(cur);
      if (cur) acc.concat(cur.toString());
      return acc;
    }, []);
  }
  return cls;
};

const getClassName = (classNames: string | undefined, { variant, disabled, active, size }: getClassNameType) => {
  const get = getClassNames({ variant, disabled, active, size });
  console.log(get);
  return typeof get === 'object'
    ? get.map((classN) => classN && classes[classN]).join(' ')
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
