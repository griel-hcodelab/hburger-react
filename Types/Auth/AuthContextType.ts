import { ForgotPasswordFormData } from './ForgotPasswordFormData';
import { LoginFormData } from './LoginFormData';
import { RegisterFormData } from './RegisterFormData';
import { ResetPasswordFormData } from './ResetPasswordFormData';
import { User } from './User';

export type AuthContextType = {
  onRegisterFormSubmit: (data: RegisterFormData) => void;
  onLoginFormSubmit: (data: LoginFormData) => void;
  onForgotPasswordFormSubmit: (data: ForgotPasswordFormData) => void;
  onResetPasswordFormSubmit: (data: ResetPasswordFormData) => void;
  token: string | null;
  user: User | null;
  loginFormIsLoading: boolean;
  registerFormIsLoading: boolean;
  forgotPasswordFormIsLoading: boolean;
  resetPasswordFormIsLoading: boolean;
};
