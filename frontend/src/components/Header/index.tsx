'use client';
import { useState, useEffect } from 'react';

import styles from './Header.module.css';
import Image from 'next/image';

import LogoutButton from '../Button/LogoutButton';
import { PiUserCircleDuotone } from 'react-icons/pi';

export async function fetchData() {
  const res = await fetch('https://samansa.kr', { cache: 'no-store' });
  const json = await res.json();
  return json;
}

export default function Header() {
  const accessToken: string | null =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('accessToken')
      : null;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className={styles.base}>
      <div>
        <a href="/">
          <Image
            className={styles.headerLogo}
            src="assets/logo_w_samansa.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '40%', height: 'auto' }}
            alt="logo"
          />
        </a>
      </div>
      <div className={styles.userBtn}>
        {isClient && accessToken ? (
          <LogoutButton />
        ) : (
          <a href="/auth/login">
            <PiUserCircleDuotone size={50} className={styles.account} />
          </a>
        )}
      </div>
    </header>
  );
}
