'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Input from '@/components/Input/ValueInput';
import Button from '@/components/Button';
import styles from './NicknamePages.module.css';
import NicknamePages from './page';

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
    const trimmedNickname = nickname.trim();
    if (!trimmedNickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    fetch(`${BASE_URL}/member/duplicate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: trimmedNickname,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.duplicate) {
          setIsDuplicateMessage('이미 사용중인 닉네임입니다.');
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
    const trimmedNickname = nickname.trim();
    if (!trimmedNickname) {
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
        nickname: trimmedNickname,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          // console.log('닉네임 저장 성공');
          sessionStorage.removeItem('accessToken');
          sessionStorage.setItem('nickname', trimmedNickname);
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
        <p className={styles.nicknameTitle}>
          사만사에서 사용할 닉네임을 입력해주세요.
        </p>
        <p className={styles.nicknameContent}>
          닉네임을 설정하지 않는 경우, 이름이 닉네임으로 설정됩니다.
        </p>
        <div className={styles.namecheck}>
          <div className={styles.inputarea}>
            <div className={styles.inputcomponent}>
              <Input
                setValue={setNickname}
                variant="nickname"
                value={nickname}
              />
            </div>
            <Button
              variant="nickname"
              onClick={() => {
                checkNickname();
              }}
            >
              중복확인
            </Button>
          </div>
          <div className={styles.nicknamemsg}>
            <p
              className={`${styles.message} ${
                isDuplicateMessage === '이미 사용중인 닉네임입니다.'
                  ? styles.error
                  : styles.success
              }`}
            >
              {isDuplicateMessage}
            </p>
          </div>
        </div>
        <div className={styles.nicknamebtn}>
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
