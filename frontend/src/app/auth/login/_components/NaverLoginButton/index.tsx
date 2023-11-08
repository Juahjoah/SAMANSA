'use client';

import styles from './NaverLoginButton.module.css';

import NaverLogin from '@/public/assets/login/NaverLogin.svg';
import NaverLoginM from '@/public/assets/login/NaverLogin_s.svg';
import Image from 'next/image';
// svgr loader install???????
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';

export default function NaverLoginButton() {
  const router = useRouter();
  const APP_URL = process.env.NEXT_PUBLIC_API_URL;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  const NAVER_URL = `${APP_URL}/oauth2/authorization/naver?redirect_uri=${REDIRECT_URI}/auth/redirect`;

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleNaverLogin = () => {
    router.push(NAVER_URL);
    // window.location.href = NAVER_URL;
  };

  return (
    <div>
      {/* <p>네이버 로그인</p> */}
      {/* <NaverLogin src={NaverLogin} alt="naver" /> */}
      <Image
        className={styles.loginLogo}
        onClick={() => {
          handleNaverLogin();
        }}
        src={isMobile ? NaverLoginM : NaverLogin}
        alt="naver"
        width={0}
        height={0}
        sizes="100vw"
        // style={{ width: '100%', height: 'auto' }}
        style={
          isMobile
            ? { width: '130%', height: 'auto' }
            : { width: '100%', height: 'auto' }
        }
      />
    </div>
  );
}
