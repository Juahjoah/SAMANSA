'use client';

import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  // const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [isClient, setIsClient] = useState(false);

  // const handleLogout = () => {
  //   fetch(`${BASE_URL}/member`, {
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         sessionStorage.removeItem('accessToken');
  //         sessionStorage.removeItem('nickname');
  //         router.push('/');
  //         // 페이지 새로고침을 트리거
  //         if (typeof window !== 'undefined') {
  //           window.location.reload();
  //         }
  //         return response.json();
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('로그아웃 실패:', error);
  //     });
  // };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className={styles.base}>
      <div className={styles.logo} onClick={() => router.push('/')}>
        <Image
          src="assets/logo_w_samansa.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '30%', height: 'auto' }}
          alt="logo"
        />
      </div>

      {isClient && accessToken ? (
        // <div onClick={handleLogout}>
        //   <VscAccount size={50} />
        // </div>
        <LogoutButton />
      ) : (
        <div onClick={() => router.push('/auth/login')}>
          <PiUserCircleDuotone size={50} className={styles.account} />
        </div>
      )}
    </header>
  );
}
