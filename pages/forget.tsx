import { NextPage } from 'next';
import AuthLayout from '../Components/Auth/Layout';

const PageComponent: NextPage = () => {
  return (
    <AuthLayout>
      <form id="form-forget">
        <p>Informe o seu endereço de e-mail:</p>

        <input type="email" name="email" placeholder="E-mail" required />

        <footer>
          <button type="submit">Enviar</button>
        </footer>
      </form>
    </AuthLayout>
  );
};

export default PageComponent;
