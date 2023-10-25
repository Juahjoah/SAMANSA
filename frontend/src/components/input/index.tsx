'use client';

// import { useState } from 'react';
import styles from './Input.module.css';

interface InputProps {
  onChange?: (e: any) => void;
  setValue?: string | any;
  placeholder?: string;
  variant?: string;
  name?: string;
  value?: string;
}

export default function Input({
  setValue,
  // placeholder = '',
  variant = 'search',
  name = '',
  value = '',
}: InputProps) {
  let variantClass = '';
  let placeholder = '';
  switch (variant) {
    case 'word':
      variantClass = styles.word;
      placeholder = '단어';
      break;
    case 'tag':
      variantClass = styles.tag;
      placeholder = '#태그';
      break;
    case 'search':
      variantClass = styles.search;
      placeholder = '단어 #태그 @사용자 를 검색하세요';
      break;
    case 'nickname':
      variantClass = styles.nickname;
      placeholder = '사용할 닉네임을 입력하세요.';
      break;
  }

  //enter 누를 때 검색바라면 검색하게
  function activeEnter(e: any) {
    if (variant != 'search') {
      return;
    }
    switch (e.key) {
      case 'Down': // IE/Edge에서 사용되는 값
      case 'ArrowDown':
        // "아래 화살표" 키가 눌렸을 때의 동작입니다.
        setValue('아래 화살표');
        break;
      case 'Up': // IE/Edge에서 사용되는 값
      case 'ArrowUp':
        // "위 화살표" 키가 눌렸을 때의 동작입니다.
        setValue('위 화살표');
        break;
      case 'Enter':
        // "enter" 또는 "return" 키가 눌렸을 때의 동작입니다.
        setValue('검색');
        break;
      default:
        return; // 키 이벤트를 처리하지 않는다면 종료합니다.
    }
  }

  return (
    <div className={styles.wrapper}>
      <input
        placeholder={placeholder}
        className={`${styles.base} ${variantClass}`}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => activeEnter(e)}
        name={name}
        value={value}
      />
    </div>
  );
}
