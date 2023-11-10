'use client';

import styles from './KakaoLoginButton.module.css';

import KakaoLogin from '@/public/assets/login/KaKaoLogin.svg';
import Image from 'next/image';
// svgr loader install???????
import { useRouter } from 'next/navigation';

export default function KakaoLoginButton() {
  const router = useRouter();
  const APP_URL = process.env.NEXT_PUBLIC_API_URL;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  const KAKAO_URL = `${APP_URL}/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}/auth/redirect`;

  const handleKakaoLogin = () => {
    router.push(KAKAO_URL);
    // window.location.href = KAKAO_URL;
  };

  return (
    <div>
      {/* <p>카카오 로그인</p> */}
      {/* <KakaoLoginLogo /> */}

      <Image
        className={styles.loginLogo}
        onClick={() => {
          handleKakaoLogin();
        }}
        src={KakaoLogin}
        alt="kakao"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
}
