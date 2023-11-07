import KakaoLoginButton from '@/app/auth/login/_components/KakaoLoginButton';
import NaverLoginButton from '@/app/auth/login/_components/NaverLoginButton';
import Logo from '@/public/assets/logo_b_samansa.png';

import { EnterMain } from '@/components/Button/RouteButton';

import styles from './LoginPage.module.css';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.login}>
        <div className={styles.backBtn}>
          <EnterMain />
        </div>
        <div className={styles.loginContent}>
          <Image
            className={styles.loginLogo}
            src={Logo}
            alt="logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '80%', height: 'auto' }}
          />
          <p className={styles.loginTitle}>사만사에 오신 것을 환영합니다. </p>
          <p className={styles.loginMsg}> 간편하게 로그인 해보세요!</p>
          <div className={styles.loginBtnArea}>
            <KakaoLoginButton />
            <NaverLoginButton />
          </div>
        </div>
      </div>
    </div>
  );
}
