import LogoRed from '../../assets/images/logo-icon-red.svg';
import LogoTextRed from '../../assets/images/logo-text-red.svg';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';


export const Header = () => {  
    const [ open, setIsOpen ] = useState(false);

    const { user, logout } = useAuth();
    
    return (
        <header>
            <Link href="/">
                <a>
                    <Image src={LogoRed} alt="Logo Icone" id="logo-icon" />
                    <Image src={LogoTextRed} alt="Logo Texto" id="logo-text" />
                </a>
            </Link>
            <div className={["profileMenu", open ? "show" : ""].join(" ")}>
                <Link href="/profile">
                    <a>Alterar Dados</a>
                </Link>
                <Link href="/addresses">
                    <a>Seus Endereços</a>
                </Link>
                <Link href="/orders">
                    <a>Seus Pedidos</a>
                </Link>
                <Link href="#">
                    <a onClick={logout}>Sair</a>
                </Link>
            </div>
            <small onClick={() => setIsOpen(!open)} className="userName">{user?.name}</small>
        </header>
    )
}
