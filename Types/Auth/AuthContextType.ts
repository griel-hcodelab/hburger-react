import { ForgotPasswordFormData } from './ForgotPasswordFormData';
import { ResetPasswordFormData } from './ResetPasswordFormData';
import { User } from './User';

export type AuthContextType = {
  onForgotPasswordFormSubmit: (data: ForgotPasswordFormData) => void;
  onResetPasswordFormSubmit: (data: ResetPasswordFormData) => void;
  initAuth: () => void;
  redirectToNextURL: () => void;
  token: string | null;
  setToken: (token: string) => void;
  user: User | null;
  forgotPasswordFormIsLoading: boolean;
  resetPasswordFormIsLoading: boolean;
};
