import { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import { useControlled } from '@hooks/useControlled';
import classes from './inputCommon.module.css';

type InputPropsType = {
  value?: string | number | undefined;
  defaultValue?: string | number | readonly string[];
  className?: string;
  onBlur?: any;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
};

//inputCommon에 value를 넣으면 controlled. 기본은 uncontrolled
//uncontrolled일때만 input을 자동 변경하게 해줌
const InputCommon = forwardRef(({ value = undefined, defaultValue, className, ...props }: InputPropsType, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useControlled({
    controlled: value,
    unControlled: defaultValue,
  });

  const controlledId = props.id;
  const uncontrolledId = useId();

  const id = useControlled({
    controlled: controlledId,
    unControlled: uncontrolledId,
  })[0];

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

  const getClassName = (className: any | undefined) => {
    const classArray: string[] | undefined = className?.split(' ');
    return typeof classArray === 'object'
      ? classArray.map((classN) => classN && classes[classN]).join(' ')
      : className
      ? classes[className]
      : '';
  };

  const classArray = className?.split(' ');

  const inputClass = classArray
    ? classArray.map((classN) => classes[classN]).join(' ')
    : className
    ? classes[className]
    : '';

  return (
    <>
      {!defaultValue ? (
        <input
          id={id}
          value={input}
          onChange={(e) => setInput(e)}
          ref={inputRef}
          className={`${classes.input} ${inputClass}`}
          {...props}
        />
      ) : (
        <input ref={inputRef} {...props} className={`${classes.input} ${inputClass}`} />
      )}
    </>
  );
});

export default InputCommon;
