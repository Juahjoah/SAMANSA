'use client';

import styles from './Header.module.css';
import Image from 'next/image';
import logo from '@/public/assets/logo_w_samansa.png';
import mobile from '@/public/assets/logo_mobile.png';
import LogoutButton from '../Button/LogoutButton';
import { useEffect, useState } from 'react';

export default function Header() {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  // 화면 크기를 가져오는 함수
  const getWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    getWindowWidth();
    window.addEventListener('resize', getWindowWidth);

    return () => {
      window.removeEventListener('resize', getWindowWidth);
    };
  }, []);

  return (
    <header className={styles.base}>
      <div>
        <a href="/">
          {windowWidth !== null && windowWidth <= 750 ? (
            <Image
              className={styles.headerLogo}
              src={mobile}
              // priority={true}
              width={75}
              height={75}
              // style={{ width: '200px', height: 'auto' }}
              alt="logo_mobile"
            />
          ) : (
            <Image
              className={styles.headerLogo}
              src={logo}
              priority={true}
              width={0}
              height={0}
              style={{ width: '440px', height: 'auto' }}
              alt="logo"
            />
          )}
        </a>
        <span className={styles.button}>
          <LogoutButton />
        </span>
      </div>
    </header>
  );
}
