import React, { useId, useImperativeHandle, forwardRef, useRef } from "react";
import classes from "./buttonCommon.module.css";
import { useButtonProps } from "@hooks/useButtonProps";
import { getClassNamesArr } from "@utils/getClassesArr";
import { ButtonPropsType, getClassNameType } from "typings/buttontypes";

const getModuleClassName = (
  customClassName: string | undefined,
  { variant, disabled, active, size, prefix }: getClassNameType
) => {
  //get = ['variant-active', '', 'active-true', 'size-large']
  const get = getClassNamesArr(
    customClassName,
    Object.entries({ variant, disabled, active, size })
  );
  console.log(get);
  if (typeof get === "object" && get.length > 0) {
    //prefix 스타일은 button, 중간은 classes 하이픈고려, custom은 마지막에 적용
    //`button ${classes[`${variant-active}`]} ${classes[`${active-true}`]} ... customClassName`
    console.log("object이고 get의 length가 0보다 큼");
    const returnedClasses =
      `${classes[`${prefix}`]}` +
        " " +
        get.map((classN) => classN && `${classes[`${classN}`]}`).join(" ") +
        " " +
        customClassName || "";
    return returnedClasses;
  } else if (get?.length === 0) {
    return prefix + " " + customClassName && customClassName;
  }
};

const ButtonCommon = forwardRef<HTMLButtonElement, ButtonPropsType>(
  (
    {
      children,
      onClickBtn,
      customClassName,
      size,
      disabled = false,
      active = true,
      variant = "default",
      href,
      ...props
    }: ButtonPropsType,
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const id = useId();

    const [buttonProps, { tagName: Component }] = useButtonProps({
      disabled,
      href,
      onClick: onClickBtn,
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

    const buttonClass = getModuleClassName(customClassName, {
      variant,
      disabled,
      active,
      size: "large",
      prefix: "button",
    });

    console.log(buttonClass);

    return (
      <>
        <Component id={id} {...buttonProps} {...props} className={buttonClass}>
          {children}
        </Component>
      </>
    );
  }
);

ButtonCommon.displayName = "ButtonCommon";

export default ButtonCommon;
