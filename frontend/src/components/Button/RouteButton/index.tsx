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
  const router = useRouter();
  return (
    <div
      className={styles.createButton}
      onClick={() => {
        router.push('/create');
      }}
    >
      +
    </div>
  );
}
