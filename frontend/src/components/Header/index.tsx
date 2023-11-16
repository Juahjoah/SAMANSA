import styles from './Header.module.css';
import Image from 'next/image';
import logo from '@/public/assets/logo_w_samansa.png';
import LogoutButton from '../Button/LogoutButton';
import mobilelogo from '@/public/assets/mobileLogo.png';

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
          <Image
            className={styles.mobile_logo}
            src={mobilelogo}
            priority={true}
            width={120}
            height={110}
            alt="logo"
          />
        </a>
        <span className={styles.button}>
          <LogoutButton />
        </span>
      </div>
    </header>
  );
}
