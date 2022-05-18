import { NextPage } from 'next';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AuthLayout from '../Components/Auth/Layout';
import { useAuth } from '../Context/AuthContext';
import { ResetPasswordFormData } from '../Types/Auth/ResetPasswordFormData';

const PageComponent: NextPage = () => {
  const { register, handleSubmit } = useForm<ResetPasswordFormData>();
  const { resetPasswordFormIsLoading, onResetPasswordFormSubmit } = useAuth();

  useEffect(() => {

  });

  return (
    <AuthLayout>
      <form id="form-forget" onSubmit={handleSubmit(onResetPasswordFormSubmit)}>
        <input
          type="password"
          placeholder="Nova senha"
          required
          {...register('password')}
        />

        <footer>
          <button type="submit" disabled={resetPasswordFormIsLoading}>
            {resetPasswordFormIsLoading ? 'Enviando' : 'Enviar'}
          </button>
        </footer>
      </form>
    </AuthLayout>
  );
};

export default PageComponent;
