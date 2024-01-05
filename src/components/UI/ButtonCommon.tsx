import React, {
  ComponentPropsWithRef,
  ReactElement,
  useId,
  useImperativeHandle,
  useRef,
} from "react";
import classes from "./buttonCommon.module.css";

type ButtonPropsType = {
  children?: string | ReactElement | number;
  className?: string;
  onClickBtn?: () => void;
} & ComponentPropsWithRef<"button">;

const ButtonCommon = React.forwardRef(
  ({ className, children, onClickBtn }: ButtonPropsType, ref) => {
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

    return (
      <button
        id={id}
        className={`${classes.button} ${className ? classes[className] : ""}`}
        onClick={onClickBtn}
        ref={buttonRef}
      >
        {children}
      </button>
    );
  }
);

export default ButtonCommon;
