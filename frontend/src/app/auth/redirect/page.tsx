'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import styles from './RedirectPage.module.css';

const SAMANSA_ACCESS_EXPIRY_TIME = 'samansaAccessExpiryTime';

function checkExpireTime(expireTime: number): boolean {
  return expireTime - new Date().getTime() < 30000;
}
export default function RedirectPage() {
  const accessToken =
    typeof window !== 'undefined'
      ? new URL(window.location.href).searchParams.get('token')
      : null;
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  // const pathname = usePathname();

  useEffect(() => {
    // 토큰이 있는지 확인
    if (accessToken) {
      // 토큰을 쿠키에 저장

      sessionStorage.setItem('accessToken', accessToken);

      // 최초 로그인 여부 확인
      fetch(`${BASE_URL}/member/nickname/change`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          // console.log('사용자 정보 요청 성공:', userData);
          const isFirstLogin = !userData.isChange;

          if (isFirstLogin) {
            // console.log('첫 로그인');
            router.push('/auth/nickname'); // 최초 로그인 사용자
          } else {
            // console.log('기존 로그인');
            const { nickname } = userData;
            sessionStorage.setItem('nickname', nickname);

            const expiryTime = Number(
              sessionStorage.getItem(SAMANSA_ACCESS_EXPIRY_TIME),
            );
            if (checkExpireTime(expiryTime)) {
              router.push('/');
            } else {
              router.push('/'); // 기존 로그인 사용자
            }
          }
        })
        .catch(() => {
          // console.error('사용자 정보 요청 실패:', error);
          router.push('/');
        });
    } else {
      // 토큰이 없으면 메인 페이지로 이동
      router.push('/');
    }
  }, [router, BASE_URL, accessToken]);

  return (
    <div className={styles.wrapper}>
      <span className={styles.loader}></span>
    </div>
  );
}
