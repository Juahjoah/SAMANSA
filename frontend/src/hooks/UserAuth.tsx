import { getCookie, setCookie, deleteCookie } from '@/hooks/UserCookies';

const ACCESS_EXPIRY_TIME = 3 * 60 * 60 * 1000;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const accessToken = getCookie('accessToken');

function handleLogout() {
  deleteCookie('accessToken');
  deleteCookie('nickname');
  sessionStorage.removeItem('accessExpiryTime');
}

export function handleToken() {
  fetch(`${BASE_URL}/token/new`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.ok) {
        const newAccessToken = responseData.data.accessToken;
        const createdTime = new Date().getTime();

        // 갱신된 토큰과 만료 시간을 저장
        setCookie('accessToken', newAccessToken, {
          path: '/',
          httpOnly: true,
        });
        sessionStorage.setItem(
          'accessExpiryTime',
          (createdTime + ACCESS_EXPIRY_TIME).toString(),
        );
      } else {
        handleLogout();
        alert('로그인 시간이 만료되었습니다.');
        console.error('Error refreshing token:');
      }
    });
}
