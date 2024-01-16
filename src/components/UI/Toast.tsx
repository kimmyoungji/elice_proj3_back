import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import BackDrop from './BackDrop';
import ToastPortal from './ToastPortal';

interface ToastContextType {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}

interface ToastPropsType {
  children: ReactNode | ReactNode[] | string;
  time?: number;
}

const ToastContext = createContext<ToastContextType | null>(null);

const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('범위 외에서 사용할 수 없습니다.');
  }

  return context;
};

export const ToastProvider = (props: ToastPropsType) => {
  const [show, setShow] = useState(false);
  const value = { show, setShow };
  return (
    <ToastContext.Provider value={value}>
      {props.children}
    </ToastContext.Provider>
  );
};

const Toast = ({ children, time }: ToastPropsType) => {
  const { show, setShow } = useToastContext();
  const onClickBackDrop = (e: React.MouseEvent) => {
    console.log(e);
    setShow(false);
  };

  setTimeout(() => {
    setShow(false);
  }, time);

  return (
    <>
      {show && (
        <ToastPortal>
          <BackDrop onClick={onClickBackDrop}>{children}</BackDrop>
        </ToastPortal>
      )}
    </>
  );
};

export default Toast;
