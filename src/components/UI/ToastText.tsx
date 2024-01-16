import { ReactNode } from 'react';
import classes from './toast.module.css';

const ToastText = ({ children }: { children: ReactNode | string }) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default ToastText;
