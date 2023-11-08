'use client';

import styles from './ReportButton.module.css';

type ButtonProps = {
  id?: string;
  memberNickname?: string;
};

// api) 신고 요청
export async function ReportData(url = '', data = {}) {
  const accessToken: string | null =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('accessToken')
      : null;
  //   const accessToken =
  //     'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb3VuZyIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2OTkzMzc1MjJ9.rtXIqC9mp5ts71IrQlbJ83eyOqX3EJW53bMOWDmLJFs';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export default function ReportButton({
  requestData,
}: {
  requestData: ButtonProps;
}) {
  const { id, memberNickname } = requestData; // 카드의 id, 유저닉네임
  const url = `${process.env.NEXT_PUBLIC_API_URL}`;
  //   const url = 'https://test.samansa.kr';
  const data = { wordId: id };

  // 로그인 유저의 정보
  const nickname: string | null =
    typeof window !== 'undefined' ? sessionStorage.getItem('nickname') : null;

  const ReportWord = async () => {
    ReportData(`${url}/declaration`, data)
      .then((data) => {
        console.log(data.message);
        console.log(memberNickname);
        if (data.message == '이미 신고하였습니다.') {
          alert('이미 신고하신 단어입니다.');
        }
      })
      .catch(() => {
        console.log('이미 신고되셨습니다.');
      });
  };

  return (
    <div className={styles.base}>
      {nickname ? <div onClick={ReportWord}>신고하기</div> : null}
    </div>
  );
}
