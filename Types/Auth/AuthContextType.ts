import { RegisterFormData } from './RegisterFormData';

export type AuthContextType = {
  onRegisterFormSubmit: (data: RegisterFormData) => void;
  token: string | null;
};
