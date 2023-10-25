'use client';

// import { useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { useRouter } from 'next/navigation';

export default function RedirectPage() {
  // const accessToken = new URL(window.location.href).searchParams.get('token');
  // const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // const router = useRouter();
  // // const pathname = usePathname();

  // useEffect(() => {
  //   // 토큰이 있는지 확인
  //   if (accessToken) {
  //     // 토큰을 세션 스토리지에 저장
  //     sessionStorage.setItem('accessToken', accessToken);
  //     // console.log("토큰 저장 완료", accessToken);

  //     // 최초 로그인 여부 확인
  //     fetch(`${BASE_URL}/member/nickname/change`, {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((userData) => {
  //         console.log('사용자 정보 요청 성공:', userData);
  //         const isFirstLogin = !userData.isChange;

  //         if (isFirstLogin) {
  //           router.push('/auth/nickname'); // 최초 로그인 사용자
  //           console.log('첫 로그인');
  //         } else {
  //           console.log('기존 로그인');
  //           const { nickname } = userData;
  //           sessionStorage.setItem('nickname', nickname);
  //           router.push('/main'); // 기존 로그인 사용자
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('사용자 정보 요청 실패:', error);
  //         router.push('/');
  //       });
  //   } else {
  //     // 토큰이 없으면 메인 페이지로 이동
  //     router.push('/');
  //   }
  // }, [router, BASE_URL, accessToken]);

  return (
    <div>
      <h1>리다이렉트 페이지</h1>
    </div>
  );
}
