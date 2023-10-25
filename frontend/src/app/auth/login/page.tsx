import KakaoLoginButton from './_components/KakaoLoginButton/page';
import NaverLoginButton from './_components/NaverLoginButton/page';

export default function LoginPages() {
  return (
    <div>
      <h1>로그인 페이지</h1>
      <KakaoLoginButton />
      <NaverLoginButton />
    </div>
  );
}
