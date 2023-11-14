'use client';

import { useState } from 'react';
import styles from './IndexButton.module.css';

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
  ];

  //모달 생성
  function CheckingModal() {
    setModalCheck(!modalCheck);
  }

  //버튼 눌렀을 시
  function checkButton(index: string) {
    const url = `${process.env.NEXT_PUBLIC_REDIRECT_URI}?type=index&value=${index}`;
    window.location.href = url;
  }

  return (
    <div className={styles.container}>
      <div className={styles.browseButton} onClick={CheckingModal}>
        <p>ㄱ~ㅎ</p>
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
              onClick={() => checkButton(item)}
            >
              {item}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
