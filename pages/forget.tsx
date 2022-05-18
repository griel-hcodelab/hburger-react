import { NextPage } from 'next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthLayout from '../Components/Auth/Layout';
import { useAuth } from '../Context/AuthContext';
import { ForgotPasswordFormData } from '../Types/Auth/ForgotPasswordFormData';

const PageComponent: NextPage = () => {
  const { register, handleSubmit } = useForm<ForgotPasswordFormData>();
  const { forgotPasswordFormIsLoading, onForgotPasswordFormSubmit } = useAuth();
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('');

  const submitForm = async (data: ForgotPasswordFormData) => {
    const message = await onForgotPasswordFormSubmit(data);
    setMessage(message);

    setShowForm(false);
  };

  return (
    <AuthLayout>
      <form id="form-forget" onSubmit={handleSubmit(submitForm)}>
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
              <button type="submit" disabled={forgotPasswordFormIsLoading}>
                {forgotPasswordFormIsLoading ? 'Enviando' : 'Enviar'}
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
