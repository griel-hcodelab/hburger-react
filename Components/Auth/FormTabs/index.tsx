import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const FormTabs: NextPage = () => {
  const router = useRouter();

  return (
    <ul id="form-tabs">
      <li className={router.pathname === '/login' ? 'active' : ''}>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </li>
      <li className={router.pathname === '/register' ? 'active' : ''}>
        <Link href="/register">
          <a>Cadastro</a>
        </Link>
      </li>
    </ul>
  );
};

export default FormTabs;
