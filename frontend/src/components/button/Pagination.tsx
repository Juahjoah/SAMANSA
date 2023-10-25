'use client';

import { useState } from 'react';
import styles from './Pagination.module.css';
// import { useRouter } from 'next/router'

// 페이지 네이션 버튼
export default function Pagination() {
  const [length, setLength] = useState(20); // 총 페이지 갯수 - api 연동 필요
  const [selectedButton, setSelectedButton] = useState(0); // 선택된 페이지 넘버 - 리덕스or리코일에 저장
  // const router = useRouter()
  // console.log(setLength(20));
  const CheckButton = (index: number) => {
    setSelectedButton(index);
    // router.push(`page${selectedButton}`)  // 클릭한 페이지넘버로 이동
  };
  const MoveLeft = () => {
    // 페이지넘버 왼쪽 이동
    if (selectedButton > 0) {
      setSelectedButton(selectedButton - 1);
      // router.push(`page${selectedButton}`)
    }
  };
  const MoveRight = () => {
    // 페이지넘버 오른쪽 이동
    if (selectedButton < length - 1) {
      setSelectedButton(selectedButton + 1);
      // router.push(`page${selectedButton}`)
    }
  };

  const DefaultLeft = () => {
    // 제일 왼쪽으로 페이지 이동
    setSelectedButton(0);
    // router.push(`page${selectedButton}`)
  };
  const DefaultRight = () => {
    // 제일 오른쪽으로 페이지 이동
    setSelectedButton(length - 1);
    // router.push(`page${selectedButton}`)
    setLength(20);
  };

  const PageElements = Array.from({ length }, (_, index) => (
    <div
      key={index}
      className={`${styles.button} ${
        selectedButton === index ? styles.selectedButton : ''
      }`}
      onClick={() => CheckButton(index)}
    >
      {index + 1}
    </div>
  ));
  //슬라이드 버튼 갯수 설정
  const visiblePageElements =
    selectedButton < 1
      ? PageElements.slice(selectedButton, selectedButton + 5)
      : selectedButton < 2
      ? PageElements.slice(selectedButton - 1, selectedButton + 4)
      : PageElements.slice(selectedButton - 2, selectedButton + 3);

  return (
    <div className={styles.container}>
      <div className={styles.arrowbutton} onClick={DefaultLeft}>
        &lt;&lt;
      </div>
      <div className={styles.arrowbutton} onClick={MoveLeft}>
        &lt;
      </div>
      <div className={styles.buttoncontainer}> {visiblePageElements}</div>
      <div className={styles.arrowbutton} onClick={MoveRight}>
        &gt;
      </div>
      <div className={styles.arrowbutton} onClick={DefaultRight}>
        &gt;&gt;
      </div>
    </div>
  );
}
