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
import { LoginFormData } from '../../Types/Auth/LoginFormData';
import { RegisterFormData } from '../../Types/Auth/RegisterFormData';

const AuthContext = createContext<AuthContextType>({
  onRegisterFormSubmit: () => {},
  onLoginFormSubmit: () => {},
  onForgotPasswordFormSubmit: () => {},
  token: null,
  loginFormIsLoading: false,
  registerFormIsLoading: false,
  forgotPasswordFormIsLoading: false,
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [nextURL] = useState('/');
  const [loginFormIsLoading, setloginFormIsLoading] = useState(false);
  const [registerFormIsLoading, setRegisterFormIsLoading] = useState(false);
  const [forgotPasswordFormIsLoading, setForgotPasswordFormIsLoading] =
    useState(false);

  const redirectToNextURL = useCallback(
    () => router.push(nextURL),
    [nextURL, router],
  );

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

  const onLoginFormSubmit = async (formData: LoginFormData) => {
    try {
      setloginFormIsLoading(true);

      const { data } = await axios.post(`/api/login`, formData);

      setToken(data.token);
      redirectToNextURL();
    } catch (error: any) {
      alert(error.response.data.message);
    } finally {
      setloginFormIsLoading(false);
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

      alert(data.message);
    } catch (error) {
      alert('Não foi possível enviar o e-mail de recuperação de senha.');
    } finally {
      setForgotPasswordFormIsLoading(false);
    }
  };

  const initAuth = () => {
    axios
      .get<AuthenticationResponse>('/api/session')
      .then(({ data: { token } }) => setToken(token));
  };

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        onRegisterFormSubmit,
        onLoginFormSubmit,
        onForgotPasswordFormSubmit,
        token,
        loginFormIsLoading,
        registerFormIsLoading,
        forgotPasswordFormIsLoading,
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
