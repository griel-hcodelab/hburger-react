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
import { LoginFormData } from '../../Types/Auth/LoginFormData';
import { RegisterFormData } from '../../Types/Auth/RegisterFormData';

const AuthContext = createContext<AuthContextType>({
  onRegisterFormSubmit: () => {},
  onLoginFormSubmit: () => {},
  token: null,
  loginFormIsLoading: false,
  registerFormIsLoading: false,
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [nextURL] = useState('/');
  const [loginFormIsLoading, setloginFormIsLoading] = useState(false);
  const [registerFormIsLoading, setRegisterFormIsLoading] = useState(false);

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
        token,
        loginFormIsLoading,
        registerFormIsLoading,
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
