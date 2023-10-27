'use client';

import { useRouter } from 'next/navigation';

export async function fetchData() {
  const res = await fetch('https://samansa.kr', { cache: 'no-store' });
  const json = await res.json();
  return json;
}

export default function LogoutButton() {
  const router = useRouter();
  const accessToken: string | null =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('accessToken')
      : null;
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleLogout = () => {
    fetch(`${BASE_URL}/member`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          sessionStorage.removeItem('accessToken');
          sessionStorage.removeItem('nickname');
          router.push('/');
          // 여기 새로고침 필요.
          return response.json();
        }
      })
      .catch((error) => {
        console.error('로그아웃 실패:', error);
      });
  };

  return (
    <div>
      {accessToken ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        <button onClick={() => router.push('/auth/login')}>로그인</button>
      )}
    </div>
  );
}
