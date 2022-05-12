import Link from 'next/link';

export const Header = () => {
    const menuOpen = "show";

    return (
        <header>
            <Link href="/">
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
            <div className="profileMenu">
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
            />
            <small className="userName">Davi Matana</small>
        </header>
    )
}
