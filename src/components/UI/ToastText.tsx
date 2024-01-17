import { ReactNode } from 'react';
import classes from './toast.module.css';

const ToastText = ({
  children,
  style,
}: {
  children: ReactNode | string;
  style?: {};
}) => {
  console.log(children);
  return (
    <div className={`${classes.wrapper}`} style={style}>
      {children}
    </div>
  );
};

export default ToastText;
