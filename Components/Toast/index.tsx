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
    <div className={['toast', type, opened ? 'open' : ''].join(' ')}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="icon success">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="icon danger">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"></path>
      </svg>
      {children}
      {/* <button className="close" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
        </svg>
      </button> */}
    </div>
  );
};
