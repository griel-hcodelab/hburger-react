import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import AuthLayout from '../Components/Auth/Layout';
import { useAuth } from '../Context/AuthContext';
import { ForgotPasswordFormData } from '../Types/Auth/ForgotPasswordFormData';

const PageComponent: NextPage = () => {
  const { register, handleSubmit } = useForm<ForgotPasswordFormData>();
  const { forgotPasswordFormIsLoading, onForgotPasswordFormSubmit } = useAuth();

  return (
    <AuthLayout>
      <form
        id="form-forget"
        onSubmit={handleSubmit(onForgotPasswordFormSubmit)}
      >
        <p>Informe o seu endereço de e-mail:</p>

        <input
          type="email"
          placeholder="E-mail"
          required
          {...register('email')}
        />

        <footer>
          <button type="submit" disabled={forgotPasswordFormIsLoading}>
            {forgotPasswordFormIsLoading ? 'Enviando' : 'Enviar'}
          </button>
        </footer>
      </form>
    </AuthLayout>
  );
};

export default PageComponent;
