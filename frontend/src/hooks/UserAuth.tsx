import { deleteCookie, getCookie, setCookie } from './UserCookies';

const ACCESS_EXPIRY_TIME = 36000000;

const SAMANSA_REFRESH_TOKEN = 'samansaRefreshToken';
const SAMANSA_ACCESS_EXPIRY_TIME = 'samansaAccessExpiryTime';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function checkExpireTime(expireTime: number): boolean {
  return expireTime - new Date().getTime() < 30000;
}

export async function refreshTokenCheck() {
  const expiryTime = Number(sessionStorage.getItem(SAMANSA_ACCESS_EXPIRY_TIME));

  if (checkExpireTime(expiryTime)) {
    try {
      const response = await fetch(`${BASE_URL}/token/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: getCookie(SAMANSA_REFRESH_TOKEN),
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const createdTime = new Date().getTime();
        const newAccessToken = responseData.data.accessToken;

        sessionStorage.setItem('accessToken', newAccessToken);
        sessionStorage.setItem(
          SAMANSA_ACCESS_EXPIRY_TIME,
          (createdTime + ACCESS_EXPIRY_TIME).toString(),
        );
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('error', error);
    }
  }
}

export function tokenError() {
  deleteCookie(SAMANSA_REFRESH_TOKEN);
  alert('로그인이 만료되었습니다.');
  window.location.href = '/';
}
