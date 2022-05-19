import LogoRed from '../../assets/images/logo-icon-red.svg';
import LogoTextRed from '../../assets/images/logo-text-red.svg';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';


export const Header = () => {  
    const [ open, setIsOpen ] = useState(false);

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
                <Link href="/orders">
                    <a>Seus Pedidos</a>
                </Link>
                <Link href="/change-photo">
                    <a>Mudar Foto</a>
                </Link>
                <Link href="/signout">
                    <a>Sair</a>
                </Link>
            </div>
            <img 
                src="/images/default.png" 
                alt="Avatar" 
                className="avatar"
                onClick={() => setIsOpen(!open)}
            />
            <small className="userName">Davi Matana</small>
        </header>
    )
}
