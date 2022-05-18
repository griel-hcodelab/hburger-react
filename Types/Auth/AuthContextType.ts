import { ForgotPasswordFormData } from './ForgotPasswordFormData';
import { RegisterFormData } from './RegisterFormData';
import { ResetPasswordFormData } from './ResetPasswordFormData';
import { User } from './User';

export type AuthContextType = {
  onRegisterFormSubmit: (data: RegisterFormData) => void;
  onForgotPasswordFormSubmit: (data: ForgotPasswordFormData) => void;
  onResetPasswordFormSubmit: (data: ResetPasswordFormData) => void;
  initAuth: () => void;
  redirectToNextURL: () => void;
  token: string | null;
  user: User | null;
  registerFormIsLoading: boolean;
  forgotPasswordFormIsLoading: boolean;
  resetPasswordFormIsLoading: boolean;
};
