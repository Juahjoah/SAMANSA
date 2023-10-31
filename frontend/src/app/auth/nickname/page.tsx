'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Input from '@/components/input';
import Button from '@/components/button';
import styles from './NicknamePages.module.css';

export default function NicknamePages() {
  const router = useRouter();
  const accessToken: string | null =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('accessToken')
      : null;
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [nickname, setNickname] = useState<string>('');
  const [isDuplicateMessage, setIsDuplicateMessage] = useState<string>('');

  // 닉네임 중복확인
  const checkNickname = () => {
    fetch(`${BASE_URL}/member/duplicate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: nickname,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.duplicate) {
          setIsDuplicateMessage('이미 사용중인 닉네임입니다.');
          // setNickname('');
        } else {
          setIsDuplicateMessage('사용 가능한 닉네임입니다.');
        }
      })
      .catch((error) => {
        console.error('닉네임 중복 확인 실패:', error);
      });
  };

  // 닉네임 저장하기
  const saveNickname = () => {
    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    fetch(`${BASE_URL}/member`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: nickname,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          // console.log('닉네임 저장 성공');
          sessionStorage.removeItem('accessToken');
          sessionStorage.setItem('nickname', nickname);
          sessionStorage.setItem('accessToken', response.token);
          setNickname('');
          router.push('/');
        }
      })
      .catch(() => {
        // console.error('닉네임 저장 실패:', error);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.nickname}>
        <h2>사만사에서 사용할 닉네임을 입력해주세요.</h2>
        {/* <p>
          닉네임은 한 번 설정하면 변경할 수 없습니다. 신중하게 결정해주세요.
        </p> */}
        <div className={styles.namecheck}>
          <div className={styles.inputarea}>
            <Input setValue={setNickname} variant="nickname" value={nickname} />
            <Button
              variant="nickname"
              onClick={() => {
                checkNickname();
              }}
            >
              중복확인
            </Button>
          </div>
          <div>
            <p className={styles.nicknamemsg}>{isDuplicateMessage}</p>
          </div>
        </div>
        <div>
          <Button
            variant="nickname"
            onClick={() => {
              saveNickname();
            }}
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}
