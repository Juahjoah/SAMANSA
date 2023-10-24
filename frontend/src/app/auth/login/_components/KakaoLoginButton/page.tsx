'use client';

export default function KakaoLoginButton() {
  const APP_URL = process.env.NEXT_PUBLIC_API_URL;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  const KAKAO_URL = `${APP_URL}/api/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}/oauth/redirect`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_URL;
  };

  return (
    <button
      onClick={() => {
        handleKakaoLogin();
      }}
    >
      <p>카카오 로그인</p>
    </button>
  );
}
