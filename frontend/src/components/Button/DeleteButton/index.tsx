'use client';

import styles from './DeleteButton.module.css';
import { useState, useEffect } from 'react';

import Modal from '@/components/Modal';

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

  const [mounted, setMounted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ModalOpen = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const DeleteWord = async () => {
    DeleteData(`${url}/api/word/${id}`)
      .then((data) => {
        console.log(data);
        window.location.href = url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // 로그인 유저의 닉네임 정보
    const nickname: string | null =
      typeof window !== 'undefined' ? sessionStorage.getItem('nickname') : null;

    if (nickname === memberNickname) {
      setMounted(true);
    }
  }, []);

  return (
    <div className={styles.base}>
      {mounted && <div onClick={ModalOpen}>삭제</div>}
      {isModalOpen && (
        <Modal
          visible={isModalOpen}
          maskClosable={true}
          variant={'delete'}
          onClose={closeModal}
          action={DeleteWord}
        />
      )}
    </div>
  );
}
