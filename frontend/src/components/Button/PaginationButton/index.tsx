'use client';

import { useEffect, useState } from 'react';
import styles from './Pagination.module.css';
// import { useRouter } from 'next/router';

type paginationProps = {
  total: number;
  page: number;
  word: string;
};

// 페이지 네이션 버튼
export default function Pagination({ total, page, word }: paginationProps) {
  const length = Math.ceil(total / 10); // 총 페이지 갯수 - api 연동 필요
  const [selectedButton, setSelectedButton] = useState(page); // 선택된 페이지 넘버 - 리덕스or리코일에 저장
  // const router = useRouter();
  const CheckButton = (index: number) => {
    setSelectedButton(index);
  };
  const MoveLeft = () => {
    // 페이지넘버 왼쪽 이동
    if (selectedButton > 0) {
      setSelectedButton(selectedButton - 1);
    }
  };
  const MoveRight = () => {
    // 페이지넘버 오른쪽 이동
    if (selectedButton < length - 1) {
      setSelectedButton(selectedButton + 1);
    }
  };

  const DefaultLeft = () => {
    // 제일 왼쪽으로 페이지 이동
    setSelectedButton(0);
  };
  const DefaultRight = () => {
    // 제일 오른쪽으로 페이지 이동
    setSelectedButton(length - 1);
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

  useEffect(() => {
    if (page != selectedButton) {
      const url = `${
        process.env.NEXT_PUBLIC_REDIRECT_URI
      }${`/search?word=${word}&page=${selectedButton + 1}`}`;
      window.location.href = url;
    }
  }, [selectedButton]);

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
