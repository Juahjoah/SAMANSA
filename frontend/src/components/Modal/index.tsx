'use client';

import styles from './Modal.module.css';
import Image from 'next/image';
import alert from '@/public/assets/alert_icon.png';

import { useState, useEffect } from 'react';

type ModalProps = {
  maskClosable: boolean;
  visible: boolean;
  variant?: string;
  onClose: () => void;
  action?: () => void;
};

export default function Modal({
  maskClosable,
  visible,
  variant,
  onClose,
  action,
}: ModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [secondcontent, setSecondContent] = useState('');
  // 버튼 상태-> 확인버튼(false) or 취소+확인 버튼(true)
  const [switchButton, setSwitchButton] = useState(false);

  useEffect(() => {
    if (variant === 'report') {
      setTitle('신고 하시겠습니까?');
      setContent('누적된 신고가 많은 단어는');
      setSecondContent('삭제될 수 있으니 주의해주세요.');
      setSwitchButton(true);
    } else if (variant === 'delete') {
      setTitle('단어를 삭제하시겠습니까?');
      setContent('삭제된 단어는 다시 복구할 수 없으니');
      setSecondContent('신중히 결정해주세요.');
      setSwitchButton(true);
    } else if (variant === 'create') {
      setTitle('로그인 후 이용하실수있습니다.');
      setContent('다시 로그인한 후에 이용해주세요.');
    } else if (variant === 'login') {
      setTitle('닉네임이 비어있습니다.');
      setContent('다시 닉네임을 입력해주세요.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onMaskClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const close = () => {
    if (onClose) {
      onClose();
    }
  };

  const active = () => {
    if (action) {
      action();
      console.log('asdf');
    }
    onClose();
  };

  return (
    <>
      <div
        className={`${styles.overlayStyle} ${visible ? styles.visible : ''}`}
      />
      <div
        className={`${styles.modalStyle} ${visible ? styles.visible : ''}`}
        onClick={maskClosable ? onMaskClick : undefined}
      >
        <div className={styles.modalInner}>
          <Image src={alert} alt="alert" width={55} height={55} />
          <p>{title}</p>
          <p>
            {content} <br /> {secondcontent}
          </p>
          <div className={styles.container}>
            {switchButton && (
              <div className={styles.closebutton} onClick={close}>
                취소
              </div>
            )}

            <div className={styles.checkbutton} onClick={active}>
              확인
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
