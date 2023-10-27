'use client';
import styles from './Card.module.css';

export default function Card({
  variant = 'large',
  title = '킹받다',
  content = '어쩌구 저쩌구 어쩌구 저쩌구',
  example = '예시 어쩌구',
  ...other
}: CardProps) {
  let variantClass;
  switch (variant) {
    case 'large':
      variantClass = styles.large;
      break;
    case 'medium':
      variantClass = styles.medium;
      break;
    case 'small':
      variantClass = styles.small;
      break;
  }
  return (
    <div {...other} className={`${styles.base} ${variantClass}`}>
      <div>{title}</div>
      <p>{content}</p>
      <p>{example}</p>
    </div>
  );
}

type CardProps = {
  variant?: 'large' | 'medium' | 'small';
  title: string;
  content: string;
  example?: string;
};
