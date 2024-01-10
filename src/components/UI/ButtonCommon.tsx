import React, { ComponentPropsWithRef, ReactElement, useId, useImperativeHandle, useRef } from 'react';
import classes from './buttonCommon.module.css';
import { BaseButtonProps, useButtonProps } from '@hooks/useButtonProps';

type ButtonVariant = 'default' | 'active' | 'default-active' | 'validated' | 'error';

export type CommonSizeType = 'large' | 'big' | 'medium' | 'med-small' | 'small' | 'ssmall' | 'tiny';

interface ButtonPropsType extends ComponentPropsWithRef<'button'> {
  children?: string | ReactElement | number;
  className?: string;
  onClickBtn?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | undefined;
  href?: string;
  variant?: ButtonVariant;
  size?: CommonSizeType;
  disabled?: boolean;
  active?: boolean;
}

interface getClassNameType {
  variant?: ButtonVariant;
  disabled?: boolean;
  active?: boolean;
  size?: CommonSizeType;
}

const getClassNames = (classNames:string|undefined, ...params: any[]): string[] | string | undefined => {
  let cls: string[] = [];
  if (params.length > 0) {
    classNames && cls?.push(classNames.toString())
    cls = cls?.concat(params.reduce((acc: string[], cur: getClassNameType) => {
      if (cur) acc.push(cur.toString())
      return acc;
    }, []));
  }
  return cls;
};

const getClassName = (classNames: string | undefined, { variant, disabled, active, size }: getClassNameType) => {
const get = getClassNames(classNames, variant, disabled, active, size);
return typeof get === 'object' ? get.map((classN) => classN && classes[classN]).join(' ') : get ? classes[get] : '';
};

const ButtonCommon = React.forwardRef<HTMLButtonElement, ButtonPropsType>(
  (
    { children, onClickBtn, className, size, disabled, active, variant = 'default', href, ...props }: ButtonPropsType,
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const id = useId();

    const [buttonProps, { tagName: Component }] = useButtonProps({
      disabled,
      href,
      onClick:onClickBtn,
      ...props,
    });

    // useImperativeHandle(
    //   ref,
    //   () => {
    //     return {
    //       focus() {
    //         buttonRef.current?.focus();
    //       },
    //     };
    //   },
    //   []
    // );

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
        <Component {...buttonProps} {...props} className={buttonClass}>
          {children}
        </Component>
      </>
    );
  }
);

ButtonCommon.displayName = 'ButtonCommon';

export default ButtonCommon;
