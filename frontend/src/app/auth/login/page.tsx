// import NaverLoginButton from './_components/NaverLoginButton';
import KakaoLoginButton from '@/app/auth/login/_components/KakaoLoginButton';
import NaverLoginButton from '@/app/auth/login/_components/NaverLoginButton';

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <KakaoLoginButton />
      <NaverLoginButton />
    </div>
  );
}
