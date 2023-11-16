'use client';

import { useEffect, useState } from 'react';
import styles from './Pagination.module.css';

type PaginationProps = {
  type: string;
  value: string;
  pagination: Pagination;
};

type Pagination = {
  total: number;
  page: number;
};

// 페이지 네이션 버튼
export default function Pagination({
  type,
  value,
  pagination,
}: PaginationProps) {
  // 총 페이지 갯수 - api 연동 필요
  const length = Math.ceil(pagination.total / 10);
  // 선택된 페이지 넘버 - 리덕스or리코일에 저장
  const [selectedButton, setSelectedButton] = useState(pagination.page - 1);

  // 현재 페이지 위치를 선택한 index값으로 변경
  const CheckButton = (index: number) => {
    setSelectedButton(index);
  };

  // 페이지넘버 왼쪽 이동
  const MoveLeft = () => {
    if (selectedButton > 0) {
      setSelectedButton(selectedButton - 1);
    }
  };

  // 페이지넘버 오른쪽 이동
  const MoveRight = () => {
    if (selectedButton < length - 1) {
      setSelectedButton(selectedButton + 1);
    }
  };

  // 제일 왼쪽으로 페이지 이동
  const DefaultLeft = () => {
    setSelectedButton(0);
  };

  // 제일 오른쪽으로 페이지 이동
  const DefaultRight = () => {
    setSelectedButton(length - 1);
  };

  // 슬라이드 버튼 생성
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
    if (pagination.page - 1 != selectedButton) {
      const url = `${process.env.NEXT_PUBLIC_REDIRECT_URI}${
        value == '' && type != 'new' ? `?` : `?type=${type}&value=${value}&`
      }page=${selectedButton + 1}`;
      window.location.href = url;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
