'use client';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

// import { PiUserCircleDuotone } from 'react-icons/pi';
// import { PiUserCircleMinusDuotone } from 'react-icons/pi';
import Image from 'next/image';
import styles from './LogoutButton.module.css';

import LoginIcon from '@/public/assets/login/login_w_b.svg';
import LogoutIcon from '@/public/assets/login/logout_w_b.svg';

import { getCookie, deleteCookie } from '@/hooks/UserCookies';

export async function fetchData() {
  const res = await fetch('https://samansa.kr', { cache: 'no-store' });
  const json = await res.json();
  return json;
}

export default function LogoutButton() {
  const router = useRouter();
  const accessToken: string | null = getCookie('accessToken');
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const accessExpiryTime = sessionStorage.getItem('accessExpiryTime');

  console.log('accessToken:', accessToken);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    fetch(`${BASE_URL}/member`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // sessionStorage.removeItem('accessToken');
          // sessionStorage.removeItem('nickname');
          deleteCookie('accessToken');
          deleteCookie('nickname');
          sessionStorage.removeItem('accessExpiryTime');
          router.push('/');
          // 페이지 새로고침을 트리거
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
          return response.json();
        }
      })
      .catch((error) => {
        console.error('로그아웃 실패:', error);
      });
  };

  return (
    <div>
      {isClient && accessExpiryTime ? (
        <div onClick={handleLogout}>
          <Image
            className={styles.logBtn}
            src={LoginIcon}
            priority={true}
            width={50}
            height={50}
            alt="logout"
          />
        </div>
      ) : (
        // <PiUserCircleMinusDuotone className={styles.logoutBtn} size={50} />
        <a href="/auth/login">
          {/* <PiUserCircleDuotone size={50} className={styles.account} /> */}
          <Image
            className={styles.logBtn}
            src={LogoutIcon}
            priority={true}
            width={50}
            height={50}
            alt="logout"
          />
        </a>
      )}

      {/* <button onClick={handleLogout}>로그아웃</button> */}
    </div>
  );
}
