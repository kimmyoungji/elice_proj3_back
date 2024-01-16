import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ToastPortal = ({ children }: { children: ReactNode | ReactNode[] }) => {
  // const portalRoot = document.getElementById('notice')!;
  const portalRoot = document.body;

  const toastContainer = React.useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    portalRoot?.appendChild(toastContainer);

    return () => {
      toastContainer.remove();
    };
  }, []);
  return createPortal(children, portalRoot);
};

export default ToastPortal;
