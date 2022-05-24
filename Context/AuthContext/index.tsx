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
import { User } from '../../Types/Auth/User';

const AuthContext = createContext<AuthContextType>({
  initAuth: () => {},
  redirectToNextURL: () => {},
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [nextURL] = useState('/');

  const redirectToNextURL = useCallback(
    () => router.push(nextURL),
    [nextURL, router],
  );

  const requiresAuthentication = (route: string) => {
    const noAuthRoutes = ['/login', '/register', '/forget', '/reset'];

    return !noAuthRoutes.includes(route);
  };

  const logout = () => {

    axios.get("/api/logout").then(() => {
      setToken(null);
      setUser(null);
      router.push("/login");
    });

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
        initAuth,
        redirectToNextURL,
        token,
        setToken,
        user,
        setUser,
        logout,
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
