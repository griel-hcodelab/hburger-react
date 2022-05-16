import { LoginFormData } from './LoginFormData';
import { RegisterFormData } from './RegisterFormData';

export type AuthContextType = {
  onRegisterFormSubmit: (data: RegisterFormData) => void;
  onLoginFormSubmit: (data: LoginFormData) => void;
  token: string | null;
};
