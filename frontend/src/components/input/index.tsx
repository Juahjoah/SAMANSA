'use client';

import { useState } from 'react';
import styles from './Input.module.css';

export default function Input({
  setValue,
  // placeholder = '',
  variant = 'search',
  name = '',
  value = '',
}) {
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
  }

  // const [value, setValue] = useState(initvalue);
  return (
    <div className={styles.wrapper}>
      <input
        placeholder={placeholder}
        className={`${styles.base} ${variantClass}`}
        onChange={(e) => setValue(e.target.value)}
        name={name}
        value={value}
      />
    </div>
  );
}
