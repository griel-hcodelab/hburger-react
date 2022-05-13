import { NextPage } from 'next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import AuthLayout from '../Components/Auth/Layout';
import { useAuth } from '../Context/AuthContext';
import { LoginFormData } from '../Types/Auth/LoginFormData';

const PageComponent: NextPage = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();

  const { onLoginFormSubmit } = useAuth();

  return (
    <AuthLayout>
      <form
        id="form-login"
        onSubmit={handleSubmit<LoginFormData>(onLoginFormSubmit)}
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
          <button type="submit">Enviar</button>
        </footer>
      </form>
    </AuthLayout>
  );
};

export default PageComponent;
