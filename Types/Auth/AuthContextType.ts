import { ResetPasswordFormData } from './ResetPasswordFormData';
import { User } from './User';

export type AuthContextType = {
  onResetPasswordFormSubmit: (data: ResetPasswordFormData) => void;
  initAuth: () => void;
  redirectToNextURL: () => void;
  token: string | null;
  setToken: (token: string) => void;
  user: User | null;
  resetPasswordFormIsLoading: boolean;
};
