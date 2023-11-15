'use client';

import styles from './ReportButton.module.css';
import { useState, useEffect } from 'react';

import Modal from '@/components/Modal';

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
  const id = requestData.id; // 카드의 id, 유저닉네임
  const url = `${process.env.NEXT_PUBLIC_API_URL}`;
  const data = { wordId: id };
  const [mounted, setMounted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ModalOpen = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ReportWord = async () => {
    ReportData(`${url}/declaration`, data)
      .then((data) => {
        console.log(data.message);
        if (data.message == '이미 신고하였습니다.') {
          alert('이미 신고하신 단어입니다.');
        }
      })
      .catch(() => {
        console.log('이미 신고되셨습니다.');
      });
  };

  useEffect(() => {
    // 로그인 유저의 정보
    const nickname: string | null =
      typeof window !== 'undefined' ? sessionStorage.getItem('nickname') : null;
    if (nickname) {
      setMounted(true);
    }
  }, []);

  return (
    <div className={styles.base}>
      {mounted && <div onClick={ModalOpen}>신고</div>}
      {isModalOpen && (
        <Modal
          visible={isModalOpen}
          maskClosable={true}
          variant={'report'}
          onClose={closeModal}
          action={ReportWord}
        />
      )}
    </div>
  );
}
