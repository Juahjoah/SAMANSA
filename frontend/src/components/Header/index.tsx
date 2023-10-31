'use client';

import Link from 'next/link';

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

  return (
    <header>
      <p> 로고 </p>
      <div>header</div>
      {accessToken ? <LogoutButton /> : null}
      <Link
        href={{
          pathname: `auth/login`,
        }}
      >
        <VscAccount />
      </Link>
    </header>
  );
}
