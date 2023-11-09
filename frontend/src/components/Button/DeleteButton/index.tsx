'use client';

import styles from './DeleteButton.module.css';
import { useState, useEffect } from 'react';

type ButtonProps = {
  id?: string;
  memberNickname?: string;
};

// api) 삭제 요청
export async function DeleteData(url = '') {
  const accessToken: string | null =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('accessToken')
      : null;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
}

export default function DeleteButton({
  requestData,
}: {
  requestData: ButtonProps;
}) {
  const { id, memberNickname } = requestData; // 카드의 id, 유저닉네임
  const url = `${process.env.NEXT_PUBLIC_REDIRECT_URI}`;

  // 로그인 유저의 닉네임 정보
  const nickname: string | null =
    typeof window !== 'undefined' ? sessionStorage.getItem('nickname') : null;

  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    if (nickname === memberNickname) {
      setMounted(true);
    }
  }, [nickname, memberNickname]);

  const DeleteWord = async () => {
    DeleteData(`${url}/api/word/${id}`)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.base}>
      {mounted && <div onClick={DeleteWord}>삭제</div>}
    </div>
  );
}
