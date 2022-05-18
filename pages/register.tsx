import { NextPage } from 'next';
import React from 'react';
import AuthLayout from '../Components/Auth/Layout';
import { useForm } from 'react-hook-form';
import { useAuth } from '../Context/AuthContext';
import { RegisterFormData } from '../Types/Auth/RegisterFormData';

const PageComponent: NextPage = () => {
  const { register, handleSubmit } = useForm<RegisterFormData>();

  const { onRegisterFormSubmit } = useAuth();

  return (
    <AuthLayout>
      <form id="form-register" onSubmit={handleSubmit<RegisterFormData>(onRegisterFormSubmit)}>
        <input
          type="text"
          placeholder="Nome"
          required
          {...register('name')}
        />
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
          <button type="submit">Enviar</button>
        </footer>
      </form>
    </AuthLayout>
  );
};

export default PageComponent;
