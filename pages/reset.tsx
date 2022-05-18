import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthLayout from '../Components/Auth/Layout';
import { ResetPasswordFormData } from '../Types/Auth/ResetPasswordFormData';

const PageComponent: NextPage = () => {
  const [formIsLoading, setFormIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm<ResetPasswordFormData>();

  const onFormSubmit = async ({ password }: ResetPasswordFormData) => {
    try {
      setFormIsLoading(true);

      await axios.post(
        `/login/reset?token=${router.query.token}`,
        { password },
        { baseURL: process.env.API_URL },
      );

      alert('Senha alterada com sucesso!');
      router.push('/login');
    } catch (error) {
      alert('Não foi possível recuperar a senha.');
    } finally {
      setFormIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form id="form-forget" onSubmit={handleSubmit(onFormSubmit)}>
        <input
          type="password"
          placeholder="Nova senha"
          required
          {...register('password')}
        />

        <footer>
          <button type="submit" disabled={formIsLoading}>
            {formIsLoading ? 'Enviando' : 'Enviar'}
          </button>
        </footer>
      </form>
    </AuthLayout>
  );
};

export default PageComponent;
