import { ReactNode } from 'react';
import FormTabs from '../FormTabs';
import Header from '../Header';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div id="auth">
      <Header />
      <main>
        <FormTabs />
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
