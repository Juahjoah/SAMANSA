'use client';
import styles from './Card.module.css';

interface Item {
  id: string;
  wordName: string;
  wordDescription: string;
  wordExample: string;
  hashtagList: string[];
  memberNickname: string;
  createDate: string;
}
type CardProps = {
  variant?: 'large' | 'medium' | 'small';
  item: Item;
};

export default function Card({ variant = 'large', item }: CardProps) {
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
    <div className={`${styles.base} ${variantClass}`}>
      <div>{item.wordName}</div>
      <p>{item.wordDescription}</p>
      <p>{item.wordExample}</p>
    </div>
  );
}
