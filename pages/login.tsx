import { NextPage } from 'next';
import Header from '../Components/Auth/Header';

const PageComponent: NextPage = () => {
  return (
    <div id="auth">
      <Header />
      <main>
        <ul id="form-tabs">
          <li className="active">
            <a href="login.html">Login</a>
          </li>
          <li>
            <a href="register.html">Cadastro</a>
          </li>
        </ul>

        <form id="form-login">
          <input type="email" name="email" placeholder="E-mail" required />
          <input type="password" name="password" placeholder="Senha" required />

          <footer>
            <a href="forget.html">Esqueceu a senha?</a>
            <button type="submit">Enviar</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default PageComponent;
