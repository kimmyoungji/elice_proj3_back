import { ReactNode } from 'react';

const BackDrop = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div className='backdrop' onClick={onClick}>
      {children}
    </div>
  );
};

export default BackDrop;
