import { useId, useState } from 'react';
import Down from '../../assets/Down';
import Up from '../../assets/Up';
import classes from './InputNumber.module.css';
import { useControlled } from '@hooks/useControlled';

interface InputBaseProps {
  label?: string;
  type?: string;
  id?: string;
  defaultValue?: string;
  value?: number;
  className?: string | {};
  placeholder?: string;
  required?: false;
  disabled?: false;
  onValueChange?: (value: any) => void;
  checkAll?: false;
  maxiumValue?: number;
}

const InputNumber = (props: InputBaseProps) => {
  const { onValueChange, defaultValue = 1, value, maxiumValue = 31 } = props;
  const [inputNum, setInputNum] = useControlled({
    controlled: value,
    unControlled: defaultValue,
  });
  const controlledId = props.id;
  const uncontrolledId = useId();
  const id = useControlled({
    controlled: controlledId,
    unControlled: uncontrolledId,
  })[0];

  return (
    <>
      <div className={classes.numberInput}>
        <input
          type='number'
          id={id}
          value={inputNum}
          className={classes.input}
          onChange={(e) => {
            if (Number(e.target.value) < 1) return;
            if (Number(e.target.value) > maxiumValue) return;
            setInputNum(Number(e.target.value));
            onValueChange?.(Number(e.target.value));
          }}
        />
        <div className={classes.absolute}>
          <div
            className={classes.upper}
            onClick={() => {
              setInputNum((prev: any) => {
                return +prev + 1;
              });
              onValueChange?.(inputNum + 1);
            }}
          >
            <Up />
          </div>
          <div
            className={classes.down}
            onClick={() => {
              setInputNum((prev: any) => {
                if (prev === 1) return prev;
                return +prev - 1;
              });
              if (inputNum === 1) return inputNum;
              onValueChange?.(inputNum - 1);
            }}
          >
            <Down />
          </div>
        </div>
      </div>
    </>
  );
};

export default InputNumber;
