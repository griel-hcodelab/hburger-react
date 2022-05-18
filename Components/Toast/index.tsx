import { ReactNode, useEffect, useState } from 'react';

export type ToastProps = {
  children: ReactNode;
  type: 'success' | 'danger';
  open?: boolean;
};

export const Toast = ({ children, type, open }: ToastProps) => {
  const [opened, setOpened] = useState(open);

  useEffect(() => setOpened(open), [open]);

  return (
    <div>
      {String(opened)} {type} {children}
    </div>
  );
};
