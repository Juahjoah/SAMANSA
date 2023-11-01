'use client';

// import { useState } from 'react';
import styles from './Textarea.module.css';

interface TextareaProps {
  setValue?: string | any;
  placeholder?: string;
  variant?: string;
  name?: string;
  value?: string;
}

export default function Textarea({
  setValue,
  // placeholder = '',
  variant = 'decs', // dd
  name = '',
  value = '',
}: TextareaProps) {
  let variantClass = '';
  let placeholder = '';
  switch (variant) {
    case 'decs':
      variantClass = styles.decs;
      placeholder = '단어의 정의를 설명해주세요.';
      break;
    case 'example':
      variantClass = styles.example;
      placeholder = '간단한 문장으로 밈이 사용되는 상황을 나타내 주세요.';
      break;
  }

  // const [value, setValue] = useState(initvalue);
  return (
    <div className={styles.wrapper}>
      <textarea
        placeholder={placeholder}
        className={`${styles.base} ${variantClass}`}
        onChange={(e) => setValue(e.target.value)}
        name={name}
        value={value}
      />
    </div>
  );
}
