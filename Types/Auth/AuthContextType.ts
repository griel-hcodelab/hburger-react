import { User } from './User';

export type AuthContextType = {
  initAuth: () => void;
  redirectToNextURL: () => void;
  token: string | null;
  setToken: (token: string) => void;
  user: User | null;
};
