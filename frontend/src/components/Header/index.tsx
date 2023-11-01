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
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '30%', height: 'auto' }}
        alt="logo"
      />
      {accessToken ? (
        <LogoutButton />
      ) : (
        <div onClick={() => router.push('/auth/login')}>
          <VscAccount size={50} />
        </div>
      )}
    </header>
  );
}
