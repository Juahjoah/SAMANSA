'use client';

import styles from './IndexButton.module.css';
import { useState } from 'react';
// import { useRouter } from 'next/router'
export default function IndexButton() {
  const [modalCheck, setModalCheck] = useState(false);
  const IndexList = [
    'ㄱ',
    'ㄴ',
    'ㄷ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅅ',
    'ㅇ',
    'ㅈ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
    'new',
  ];
  // const router = useRouter()

  const CheckingModal = () => {
    setModalCheck(!modalCheck);
  };
  const checkButton = (index: number) => {
    console.log('임시버튼이동', index);
    // router.push(`page${index}`)  // 클릭한 페이지넘버로 이동
  };
  return (
    <div className={styles.container}>
      <div className={styles.browseButton} onClick={CheckingModal}>
        <p>A-Z</p>
        <div className={styles.arrow}>▼</div>
      </div>
      {modalCheck ? (
        <div className={styles.modal}>
          {IndexList.map((item, index) => (
            <div
              className={`${styles.button} ${
                item === 'new' ? styles.newButton : ''
              }`}
              key={index}
              onClick={() => checkButton(index)}
            >
              {item}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
