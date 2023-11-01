'use client';

import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import Image from 'next/image';

import LogoutButton from '../Button/LogoutButton';
import { VscAccount } from 'react-icons/vsc';

export async function fetchData() {
  const res = await fetch('https://samansa.kr', { cache: 'no-store' });
  const json = await res.json();
  return json;
}

export default function Header() {
  const accessToken: string | null =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('accessToken')
      : null;
  const router = useRouter();

  return (
    <header className={styles.base}>
      <Image
        src="assets/logo_w_samansa.png"
        height={42}
        width={180}
        alt="logo"
      />
      {accessToken ? (
        <LogoutButton />
      ) : (
        <div onClick={() => router.push('/auth/login')}>
          로그인 <VscAccount />
        </div>
      )}
    </header>
  );
}
