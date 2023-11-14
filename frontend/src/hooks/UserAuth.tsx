import { getCookie, setCookie, deleteCookie } from '@/hooks/UserCookies';

const ACCESS_EXPIRY_TIME = 3 * 60 * 60 * 1000;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const accessToken = getCookie('accessToken');

function handleExpiration() {
  fetch(`${BASE_URL}/member`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        deleteCookie('accessToken');
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
        return response.json();
      }
    })
    .catch((error) => {
      console.error('실패:', error);
      // 갱신 실패 시 처리 로직 추가
    });
}

export async function handleToken() {
  const response = await fetch(`${BASE_URL}/token/new`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    const responseData = await response.json();
    const newAccessToken = responseData.data.accessToken;
    const createdTime = new Date().getTime();

    // 갱신된 토큰과 만료 시간을 저장
    setCookie('accessToken', newAccessToken, { path: '/', httpOnly: true });
    sessionStorage.setItem(
      'accessExpiryTime',
      (createdTime + ACCESS_EXPIRY_TIME).toString(),
    );
  } else {
    alert('로그인 시간이 만료되었습니다.');
    console.error(
      'Error refreshing token:',
      response.status,
      response.statusText,
    );
    // 갱신 실패 시 처리 로직 추가
    handleExpiration();
  }
}
