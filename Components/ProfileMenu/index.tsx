import Link from 'next/link';
import styles from './menu.module.scss';

export const ProfileMenu = ({open}:{ open: boolean }) => {
    return (
        <div className={[styles.profileMenu && open ? `${styles.profileMenu} show` : styles.profileMenu].join(" ")}>
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
    )
}
