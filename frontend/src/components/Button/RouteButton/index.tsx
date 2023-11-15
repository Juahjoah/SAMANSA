'use client';

import { useState } from 'react';
import styles from './RouteButton.module.css';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';

// 메인페이지 이동 버튼
export function EnterMain() {
  return (
    <div className={styles.mainButton}>
      <a href="/">⨉</a>
    </div>
  );
}

// 단어 등록페이지 이동 버튼
export function EnterCreate() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ModalOpen = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const accessToken: string | null =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('accessToken')
      : null;
  const router = useRouter();

  const goCreate = () => {
    if (accessToken) {
      router.push('/create');
    } else {
      ModalOpen();
    }
  };

  const goLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className={styles.createButton} onClick={goCreate}>
      ＋
      {isModalOpen && (
        <Modal
          visible={isModalOpen}
          maskClosable={true}
          variant={'create'}
          onClose={closeModal}
          action={goLogin}
        />
      )}
    </div>
  );
}
