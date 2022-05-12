import { FormRegisterData } from './RegisterFormData';

export type AuthContextType = {
  onRegisterFormSubmit: (data: FormRegisterData) => void;
  token: string | null;
};
