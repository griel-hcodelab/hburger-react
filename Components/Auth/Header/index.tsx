import { NextPage } from 'next';

const Header: NextPage = () => {
  return (
    <header>
      <a href="index.html">
        <img src="/images/logo-icon-red.svg" alt="Logo Icone" id="logo-icon" />
        <img src="/images/logo-text-red.svg" alt="Logo Texto" id="logo-text" />
      </a>
    </header>
  );
};

export default Header;
