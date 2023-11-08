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
    // 컴포넌트가 마운트되면 화면 크기를 가져옴
    getWindowWidth();

    // 브라우저 창 크기가 변경될 때마다 화면 크기를 업데이트
    window.addEventListener('resize', getWindowWidth);

    // 컴포넌트가 언마운트될 때 리스너 제거
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
