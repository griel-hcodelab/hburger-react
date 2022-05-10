import LogoRed from '../../assets/images/logo-icon-red.svg';
import LogoTextRed from '../../assets/images/logo-text-red.svg';

import Image from 'next/image';
import styles from './header.module.scss';
import { ProfilePhoto } from '../ProfilePhoto';
import { ProfileMenu } from '../ProfileMenu';
import { useState } from 'react';

export const Header = () => {

    return (
        <header className={styles.header}>
            
            <a href="#">
                <Image src={LogoRed} alt="Logo Icone" id="logo-icon" />
                <Image src={LogoTextRed} alt="Logo Texto" id="logo-text" />
            </a>

            <ProfilePhoto />
            
            <ProfileMenu open={false} />
            
        </header>
    )
}
