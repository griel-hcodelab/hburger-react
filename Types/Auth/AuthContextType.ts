import { ForgotPasswordFormData } from './ForgotPasswordFormData';
import { LoginFormData } from './LoginFormData';
import { RegisterFormData } from './RegisterFormData';
import { User } from './User';

export type AuthContextType = {
  onRegisterFormSubmit: (data: RegisterFormData) => void;
  onLoginFormSubmit: (data: LoginFormData) => void;
  onForgotPasswordFormSubmit: (data: ForgotPasswordFormData) => void;
  token: string | null;
  user: User | null;
  loginFormIsLoading: boolean;
  registerFormIsLoading: boolean;
  forgotPasswordFormIsLoading: boolean;
};
