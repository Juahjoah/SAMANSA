'use client';
import styles from './RouteButton.module.css';
import { useRouter } from 'next/navigation';

export function EnterMain() {
  const router = useRouter();
  return (
    <div
      className={styles.mainButton}
      onClick={() => {
        router.push('/');
      }}
    >
      x
    </div>
  );
}

export function EnterCreate() {
  const accessToken: string | null =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('accessToken')
      : null;
  const router = useRouter();
  const goCreate = () => {
    if (accessToken) {
      router.push('/create');
    } else {
      alert('로그인 후 이용 가능합니다.');
      router.push('/auth/login');
    }
  };
  return (
    <div className={styles.createButton} onClick={goCreate}>
      +
    </div>
  );
}
