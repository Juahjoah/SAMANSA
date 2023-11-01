// import NaverLoginButton from './_components/NaverLoginButton';
import KakaoLoginButton from '@/app/auth/login/_components/KakaoLoginButton';
import NaverLoginButton from '@/app/auth/login/_components/NaverLoginButton';
import Logo from '@/public/assets/logo_b_samansa.png';

import styles from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.login}>
        <img src={Logo.src} width="80%" alt="logo" />
        <h2 className={styles.loginTitle}> 사만사에 오신 것을 환영합니다. </h2>
        <p className={styles.loginMsg}> 간편하게 로그인 해보세요!</p>
        <div className={styles.loginBtn}>
          <KakaoLoginButton />
          <NaverLoginButton />
        </div>
      </div>
    </div>
  );
}
