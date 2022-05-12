import { NextPage } from 'next';
import Link from 'next/link';

const Header: NextPage = () => {
  return (
    <header>
      <Link href="/login">
        <a>
          <img
            src="/images/logo-icon-red.svg"
            alt="Logo Icone"
            id="logo-icon"
          />
          <img
            src="/images/logo-text-red.svg"
            alt="Logo Texto"
            id="logo-text"
          />
        </a>
      </Link>
    </header>
  );
};

export default Header;
