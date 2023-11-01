'use client';

import styles from './ValueInput.module.css';

type InputProps = {
  setValue?: (e: any) => void | any;
  placeholder?: string;
  variant?: string;
  name?: string;
  value?: string;
  isMain?: boolean;
};

export default function ValueInput({
  setValue = () => {},
  variant = 'word',
  name = '',
  value = '',
}: InputProps) {
  //place holder 설정
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
    case 'nickname':
      variantClass = styles.nickname;
      placeholder = '사용할 닉네임을 입력하세요.';
      break;
  }

  function InputChange(e: any) {
    setValue(e.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <input
        placeholder={placeholder}
        className={`${styles.base} ${variantClass} `}
        onChange={(e) => InputChange(e)}
        name={name}
        value={value}
      />
    </div>
  );
}
