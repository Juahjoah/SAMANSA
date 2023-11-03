import styles from './Header.module.css';
import Image from 'next/image';

import LogoutButton from '../Button/LogoutButton';

export default function Header() {
  return (
    <header className={styles.base}>
      <div>
        <a href="/">
          <Image
            className={styles.headerLogo}
            src="assets/logo_w_samansa.png"
            priority={true}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '40%', height: 'auto' }}
            alt="logo"
          />
        </a>
      </div>
      <div className={styles.userBtn}>
        <LogoutButton />
      </div>
    </header>
  );
}
