'use client';
import NaverLogin from '@/public/assets/login/NaverLogin.svg';
import Image from 'next/image';
// svgr loader install???????
import { useRouter } from 'next/navigation';

export default function NaverLoginButton() {
  const router = useRouter();
  const APP_URL = process.env.NEXT_PUBLIC_API_URL;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  const NAVER_URL = `${APP_URL}/oauth2/authorization/naver?redirect_uri=${REDIRECT_URI}/auth/redirect`;

  const handleNaverLogin = () => {
    router.push(NAVER_URL);
    // window.location.href = NAVER_URL;
  };

  return (
    <div>
      {/* <p>네이버 로그인</p> */}
      {/* <NaverLogin src={NaverLogin} alt="naver" /> */}
      <Image
        onClick={() => {
          handleNaverLogin();
        }}
        src={NaverLogin}
        alt="naver"
      />
    </div>
  );
}
