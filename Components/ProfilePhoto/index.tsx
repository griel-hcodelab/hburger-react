import Image from "next/image"
import DefaultProfilePhoto from '../../assets/images/default.png';
import styles from './avatar.module.scss';

export const ProfilePhoto = () => {

  return (
    <>
      <div className={styles.profile}>
          <Image src={DefaultProfilePhoto} alt="Avatar" className={styles.profileImg} />
      </div>
      <small id="userName">Davi Matana</small>
    </>
  )
}
