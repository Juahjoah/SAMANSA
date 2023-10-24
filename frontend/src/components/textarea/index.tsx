'use client';

import { useState } from 'react';
import styles from './Textarea.module.css';

export default function Textarea({
  // onChange = () => {},
  // placeholder = '',
  variant = 'decs',
  name = '',
  initvalue = '',
}) {
  let variantClass = '';
  let placeholder = '';
  switch (variant) {
    case 'decs':
      variantClass = styles.decs;
      placeholder = '정의';
      break;
    case 'example':
      variantClass = styles.example;
      placeholder = '예문';
      break;
  }

  const [value, setValue] = useState(initvalue);
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
