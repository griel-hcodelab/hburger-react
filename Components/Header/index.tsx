import LogoRed from '../../assets/images/logo-icon-red.svg';
import LogoTextRed from '../../assets/images/logo-text-red.svg';

import Image from 'next/image';
import { ProfilePhoto } from '../ProfilePhoto';
import { ProfileMenu } from '../ProfileMenu';
import Link from 'next/link';


export const Header = () => {

    return (
        <header>

            <Link href="/">
                <a>
                    <Image src={LogoRed} alt="Logo Icone" id="logo-icon" />
                    <Image src={LogoTextRed} alt="Logo Texto" id="logo-text" />
                </a>
            </Link>

            <ProfilePhoto />

            <ProfileMenu open={false} />

        </header>
    )
}
