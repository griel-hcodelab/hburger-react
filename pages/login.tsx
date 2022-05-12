import { NextPage } from 'next';
import Link from 'next/link';
import AuthLayout from '../Components/Auth/Layout';

const PageComponent: NextPage = () => {
  return (
    <AuthLayout>
      <form id="form-login">
        <input type="email" name="email" placeholder="E-mail" required />
        <input type="password" name="password" placeholder="Senha" required />

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
