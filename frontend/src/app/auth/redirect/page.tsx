'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import styles from './RedirectPage.module.css';

import { setCookie } from '@/hooks/UserCookies';
import { handleToken } from '@/hooks/UserAuth';

const ACCESS_EXPIRY_TIME = 3 * 60 * 60 * 1000;

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
      // sessionStorage.setItem('accessToken', accessToken);
      // 토큰을 쿠키에 저장
      setCookie('accessToken', accessToken, { path: '/', httpOnly: true });

      sessionStorage.setItem(
        'accessExpiryTime',
        (new Date().getTime() + ACCESS_EXPIRY_TIME).toString(),
      );
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
            router.push('/auth/nickname'); // 최초 로그인 사용자
          } else {
            const expiryTime = Number(
              sessionStorage.getItem('accessExpiryTime'),
            );

            // 만료 시간 체크
            if (expiryTime && expiryTime < new Date().getTime()) {
              // 만료 시간이 지났으면 토큰 갱신
              handleToken();
            } else {
              // 아니면 메인으로 이동
              sessionStorage.setItem('nickname', userData.nickname);
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
