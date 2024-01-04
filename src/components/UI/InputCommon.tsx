//defaultProps속성 ? 가져오기
//Basic Prop Types Examples
//type AppProps = {
// message: string;
// count: number;
// disabled: boolean;
// names: string[];

import { forwardRef, useImperativeHandle, useRef } from "react";
import { useControlled } from "../../hooks/useControlled";

type InputPropsType = {
  value?: string | number | undefined;
  defaultValue?: string | number;
  className?: string;
  onBlur?: any;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
};

//inputCommon에 value를 넣으면 controlled. 기본은 uncontrolled
//uncontrolled일때만 input을 자동 변경하게 해줌
const InputCommon = forwardRef(
  ({ value = undefined, defaultValue, ...props }: InputPropsType, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [input, setInput] = useControlled({
      value,
      defaultValue,
    });

    //focus기능
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
      <>
        {input ? (
          <input
            value={input}
            onChange={(e) => setInput(e)}
            ref={inputRef}
            {...props}
          />
        ) : (
          <input value={input} ref={inputRef} {...props} />
        )}
      </>
    );
  }
);

export default InputCommon;
