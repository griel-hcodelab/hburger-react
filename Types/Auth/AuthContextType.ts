import { ForgotPasswordFormData } from './ForgotPasswordFormData';
import { LoginFormData } from './LoginFormData';
import { RegisterFormData } from './RegisterFormData';

export type AuthContextType = {
  onRegisterFormSubmit: (data: RegisterFormData) => void;
  onLoginFormSubmit: (data: LoginFormData) => void;
  onForgotPasswordFormSubmit: (data: ForgotPasswordFormData) => void;
  token: string | null;
  loginFormIsLoading: boolean;
  registerFormIsLoading: boolean;
  forgotPasswordFormIsLoading: boolean;
};
