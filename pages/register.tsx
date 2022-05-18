import { NextPage } from 'next';
import React, { useState } from 'react';
import AuthLayout from '../Components/Auth/Layout';
import { useForm } from 'react-hook-form';
import { useAuth } from '../Context/AuthContext';
import { RegisterFormData } from '../Types/Auth/RegisterFormData';
import axios from 'axios';

const PageComponent: NextPage = () => {
  const [formIsLoading, setFormIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const { redirectToNextURL, setToken } = useAuth();

  const onFormSubmit = async (formData: RegisterFormData) => {
    try {
      setFormIsLoading(true);

      const { data } = await axios.post('/api/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      setToken(data.token);
      redirectToNextURL();
    } catch (error: any) {
      alert(error.response.data.message);
    } finally {
      setFormIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form
        id="form-register"
        onSubmit={handleSubmit<RegisterFormData>(onFormSubmit)}
      >
        <input type="text" placeholder="Nome" required {...register('name')} />
        <input
          type="email"
          placeholder="E-mail"
          required
          {...register('email')}
        />
        <input
          type="tel"
          placeholder="Telefone"
          required
          {...register('phone')}
        />
        <input
          type="password"
          placeholder="Senha"
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
