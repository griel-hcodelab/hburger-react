import axios from 'axios';
import { NextPage } from 'next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthLayout from '../Components/Auth/Layout';
import { ForgotPasswordFormData } from '../Types/Auth/ForgotPasswordFormData';

const PageComponent: NextPage = () => {
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('');
  const { register, handleSubmit } = useForm<ForgotPasswordFormData>();

  const onFormSubmit = async ({ email }: ForgotPasswordFormData) => {
    try {
      setFormIsLoading(true);

      const { data } = await axios.post(
        '/login/forget',
        { email },
        { baseURL: process.env.API_URL },
      );

      setMessage(data.message);
      setShowForm(false);
    } catch (error) {
      setMessage('Não foi possível enviar o e-mail de recuperação de senha.');
    } finally {
      setFormIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form id="form-forget" onSubmit={handleSubmit(onFormSubmit)}>
        {showForm && (
          <>
            <p>Informe o seu endereço de e-mail:</p>

            <input
              type="email"
              placeholder="E-mail"
              required
              {...register('email')}
            />

            <footer>
              <button type="submit" disabled={formIsLoading}>
                {formIsLoading ? 'Enviando' : 'Enviar'}
              </button>
            </footer>
          </>
        )}

        {!showForm && <p>{message}</p>}
      </form>
    </AuthLayout>
  );
};

export default PageComponent;
