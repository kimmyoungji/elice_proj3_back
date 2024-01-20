import { ReactNode } from 'react';
import classes from './backDrop.module.css';
const BackDrop = ({
  children,
  onClick,
}: {
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div className={classes.backdrop} onClick={onClick}>
      {children}
    </div>
  );
};

export default BackDrop;
