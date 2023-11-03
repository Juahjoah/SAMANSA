'use client';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { PiUserCircleDuotone } from 'react-icons/pi';
import { PiUserCircleMinusDuotone } from 'react-icons/pi';
import styles from './LogoutButton.module.css';

export async function fetchData() {
  const res = await fetch('https://samansa.kr', { cache: 'no-store' });
  const json = await res.json();
  return json;
}

export default function LogoutButton() {
  const router = useRouter();
  const accessToken: string | null =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('accessToken')
      : null;
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
          sessionStorage.removeItem('accessToken');
          sessionStorage.removeItem('nickname');
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
    <div onClick={handleLogout}>
      {isClient && accessToken ? (
        <PiUserCircleMinusDuotone className={styles.logoutBtn} size={50} />
      ) : (
        <a href="/auth/login">
          <PiUserCircleDuotone size={50} className={styles.account} />
        </a>
      )}

      {/* <button onClick={handleLogout}>로그아웃</button> */}
    </div>
  );
}
