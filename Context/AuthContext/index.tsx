import axios from 'axios';
import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthContextType } from '../../Types/Auth/AuthContextType';
import { AuthenticationResponse } from '../../Types/Auth/AuthenticationResponse';
import { AuthProviderProps } from '../../Types/Auth/AuthProviderProps';
import { ForgotPasswordFormData } from '../../Types/Auth/ForgotPasswordFormData';
import { RegisterFormData } from '../../Types/Auth/RegisterFormData';
import { ResetPasswordFormData } from '../../Types/Auth/ResetPasswordFormData';
import { User } from '../../Types/Auth/User';

const AuthContext = createContext<AuthContextType>({
  onRegisterFormSubmit: () => {},
  initAuth: () => {},
  redirectToNextURL: () => {},
  onForgotPasswordFormSubmit: () => {},
  onResetPasswordFormSubmit: () => {},
  token: null,
  user: null,
  registerFormIsLoading: false,
  forgotPasswordFormIsLoading: false,
  resetPasswordFormIsLoading: false,
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [nextURL] = useState('/');
  const [registerFormIsLoading, setRegisterFormIsLoading] = useState(false);
  const [forgotPasswordFormIsLoading, setForgotPasswordFormIsLoading] =
    useState(false);
  const [resetPasswordFormIsLoading, setResetPasswordFormIsLoading] =
    useState(false);

  const redirectToNextURL = useCallback(
    () => router.push(nextURL),
    [nextURL, router],
  );

  const requiresAuthentication = (route: string) => {
    const noAuthRoutes = ['/login', '/register', '/forget', '/reset'];

    return !noAuthRoutes.includes(route);
  };

  const onRegisterFormSubmit = async (formData: RegisterFormData) => {
    try {
      setRegisterFormIsLoading(true);

      const { data } = await axios.post('/api/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      setToken(data.token);
      redirectToNextURL();
    } catch (error: any) {
      alert(error.response.data.message);
    } finally {
      setRegisterFormIsLoading(false);
    }
  };

  const onForgotPasswordFormSubmit = async ({
    email,
  }: ForgotPasswordFormData) => {
    try {
      setForgotPasswordFormIsLoading(true);

      const { data } = await axios.post(
        '/login/forget',
        { email },
        { baseURL: process.env.API_URL },
      );

      return data.message;
    } catch (error) {
      return 'Não foi possível enviar o e-mail de recuperação de senha.';
    } finally {
      setForgotPasswordFormIsLoading(false);
    }
  };

  const onResetPasswordFormSubmit = async ({
    password,
  }: ResetPasswordFormData) => {
    try {
      setResetPasswordFormIsLoading(true);

      await axios.post(
        `/login/reset?token=${router.query.token}`,
        { password },
        { baseURL: process.env.API_URL },
      );

      alert('Senha alterada com sucesso!');
      router.push('/login');
    } catch (error) {
      alert('Não foi possível recuperar a senha.');
    } finally {
      setForgotPasswordFormIsLoading(false);
    }
  };

  const initAuth = () => {
    axios
      .get<AuthenticationResponse>('/api/session')
      .then(({ data: { token, user } }) => {
        setToken(token);
        setUser(user);
      })
      .catch(() => {
        if (requiresAuthentication(router.pathname)) {
          router.push('/login');
        }
      });
  };

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        onRegisterFormSubmit,
        onForgotPasswordFormSubmit,
        onResetPasswordFormSubmit,
        initAuth,
        redirectToNextURL,
        token,
        user,
        registerFormIsLoading,
        forgotPasswordFormIsLoading,
        resetPasswordFormIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
