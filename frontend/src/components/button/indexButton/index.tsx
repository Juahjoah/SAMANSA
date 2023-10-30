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
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
  ];
  // const router = useRouter()

  const CheckingModal = () => {
    setModalCheck(!modalCheck);
  };
  const checkButton = (index: number) => {
    console.log('임시버튼이동');
    // router.push(`page${index}`)  // 클릭한 페이지넘버로 이동
  };
  return (
    <div>
      <div className={styles.browseButton} onClick={CheckingModal}>
        Browse
      </div>
      {modalCheck ? (
        <div className={styles.modal}>
          {IndexList.map((item, index) => (
            <div
              className={styles.button}
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
