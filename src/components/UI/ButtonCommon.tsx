import React, {
  ComponentPropsWithRef,
  ReactElement,
  useImperativeHandle,
  useRef,
} from "react";
import classes from "./button.module.css";

type ButtonPropsType = {
  children?: string | ReactElement;
  className?: string;
  onClickBtn?: () => void;
} & ComponentPropsWithRef<"button">;

const ButtonCommon = React.forwardRef(
  ({ className, children, onClickBtn }: ButtonPropsType, ref) => {
    const inputRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          focus() {
            inputRef.current?.focus();
          },
        };
      },
      []
    );

    return (
      <button
        className={`${classes.button} ${className ? classes[className] : ""}`}
        onClick={onClickBtn}
        ref={inputRef}
      >
        {children}
      </button>
    );
  }
);

export default ButtonCommon;
