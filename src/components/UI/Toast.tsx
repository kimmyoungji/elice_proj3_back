import {
  Children,
  ReactElement,
  ReactNode,
  SetStateAction,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import BackDrop from './BackDrop';
import ToastPortal from './ToastPortal';

interface ToastContextType {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}

interface ToastPropsType {
  children: ReactElement | ReactElement[];
  time?: number;
  show?: boolean;
  setShow?: React.Dispatch<SetStateAction<boolean>>;
  position?: { x: number; y: number };
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

const Toast = ({
  children,
  time = 1000,
  setShow,
  show,
  position,
  ...props
}: ToastPropsType) => {
  const onClickBackDrop = (e: React.MouseEvent) => {
    console.log(e);
    setShow?.(false);
  };

  const positionStyle = position && {
    position: 'absolute',
    left: `${position.x + 20}px`,
    top: `${position.y + 20}px`,
  };

  const positionedElement = Children.map(children, (ch) => {
    return cloneElement(ch, {
      ...props,
      style: positionStyle,
      show,
    });
  });
  console.log(positionedElement);

  useEffect(() => {
    setTimeout(() => {
      setShow?.(false);
    }, time);
  }, [show]);

  return (
    <>
      {show && (
        <ToastPortal>
          <BackDrop onClick={onClickBackDrop} />
          {positionedElement}
        </ToastPortal>
      )}
    </>
  );
};

export default Toast;
