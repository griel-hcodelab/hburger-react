import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthLayout from '../Components/Auth/Layout';
import { Toast } from '../Components/Toast';
import { ResetPasswordFormData } from '../Types/Auth/ResetPasswordFormData';

const PageComponent: NextPage = () => {
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'danger'>('danger');
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [message, setMessage] = useState('');

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

      showToast('Senha alterada com sucesso!', 'success');
      router.push('/login');
    } catch (error) {
      showToast('Não foi possível recuperar a senha.', 'danger');
    } finally {
      setFormIsLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'danger') => {
    setMessage(message);
    setToastType(type);
    setToastIsOpen(true);

    setTimeout(() => {
      setToastIsOpen(false);
    }, 5000);
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

        <Toast type={toastType} open={toastIsOpen}>
          <p>{message}</p>
        </Toast>
      </form>
    </AuthLayout>
  );
};

export default PageComponent;
