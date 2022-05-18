import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthLayout from '../Components/Auth/Layout';
import { Toast } from '../Components/Toast';
import { useAuth } from '../Context/AuthContext';
import { LoginFormData } from '../Types/Auth/LoginFormData';

const PageComponent: NextPage = () => {
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'danger'>('danger');
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit } = useForm<LoginFormData>();
  const { initAuth, redirectToNextURL } = useAuth();

  const onFormSubmit = async (formData: LoginFormData) => {
    try {
      setFormIsLoading(true);

      await axios.post(`/api/login`, formData);

      initAuth();
      redirectToNextURL();
    } catch (error: any) {
      showErrorToast(error.response.data.message);
    } finally {
      setFormIsLoading(false);
    }
  };

  const showErrorToast = (message: string) => {
    setError(message);
    setToastType('danger');
    setToastIsOpen(true);

    setTimeout(() => {
      setToastIsOpen(false);
    }, 3000);
  };

  return (
    <AuthLayout>
      <form
        id="form-login"
        onSubmit={handleSubmit<LoginFormData>(onFormSubmit)}
      >
        <input
          type="email"
          placeholder="E-mail"
          required
          {...register('email')}
        />
        <input
          type="password"
          placeholder="Senha"
          required
          {...register('password')}
        />

        <footer>
          <Link href="/forget">
            <a>Esqueceu a senha?</a>
          </Link>
          <button type="submit" disabled={formIsLoading}>
            {formIsLoading ? 'Enviando' : 'Enviar'}
          </button>
        </footer>

        <Toast type={toastType} open={toastIsOpen}>
          <p>{error}</p>
        </Toast>
      </form>
    </AuthLayout>
  );
};

export default PageComponent;
