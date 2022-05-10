import styles from './menu.module.scss';

export const ProfileMenu = ({open}:{ open: boolean }) => {
    return (
        <div className={styles.profileMenu && open ? `${styles.profileMenu} show` : styles.profileMenu}>
            <a href="profile.html">Alterar Dados</a>
            <a href="orders.html">Seus Pedidos</a>
            <a href="change-photo.html">Mudar Foto</a>
            <a href="signout.html">Sair</a>
        </div>
    )
}
