import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classes from './toast.module.css';

const ToastPortal = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return createPortal(children, document.getElementById('notice')!);
};

export default ToastPortal;
