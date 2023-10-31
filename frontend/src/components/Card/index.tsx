import styles from './Card.module.css';

export default function Card({ variant = 'large', item }: CardProps) {
  const { wordName, wordDescription, wordExample, memberNickname, createDate } =
    item;

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
      <div>{wordName}</div>
      <p>{wordDescription}</p>
      <p>{wordExample}</p>
      <p>{memberNickname}</p>
      <p>{createDate}</p>
    </div>
  );
}

type Item = {
  id?: string;
  wordName: string;
  wordDescription: string;
  wordExample: string;
  hashtagList?: string[];
  memberNickname?: string;
  createDate?: string;
};
type CardProps = {
  variant?: 'large' | 'medium' | 'small';
  item: Item;
};
