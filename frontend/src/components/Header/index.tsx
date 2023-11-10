import styles from './Header.module.css';
import Image from 'next/image';
import logo from '@/public/assets/logo_w_samansa.png';
import LogoutButton from '../Button/LogoutButton';

export default function Header() {
  return (
    <header className={styles.base}>
      <div>
        <a href="/">
          <Image
            className={styles.headerLogo}
            src={logo}
            priority={true}
            width={0}
            height={0}
            style={{ width: '440px', height: 'auto' }}
            alt="logo"
          />
          <p className={styles.mobile_logo}>S</p>
        </a>
        <span className={styles.button}>
          <LogoutButton />
        </span>
      </div>
    </header>
  );
}
