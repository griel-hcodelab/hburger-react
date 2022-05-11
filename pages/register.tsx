import { NextPage } from 'next';
import AuthLayout from '../Components/Auth/Layout';

const PageComponent: NextPage = () => {
  return (
    <AuthLayout>
      <form id="form-register">
        <input type="text" name="name" placeholder="Nome" required />
        <input type="email" name="email" placeholder="E-mail" required />
        <input type="password" name="password" placeholder="Senha" required />

        <footer>
          <button type="submit">Enviar</button>
        </footer>
      </form>
    </AuthLayout>
  );
};

export default PageComponent;
