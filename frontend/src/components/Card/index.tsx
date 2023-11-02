import styles from './Card.module.css';

export default function Card({ variant = 'large', item }: CardProps) {
  const { wordName, wordDescription, wordExample, memberNickname, createDate } =
    item;
  let formattedDate = '';

  const formattedDescription = wordDescription.split('\n').map((item, key) => {
    return (
      <span key={key}>
        {item}
        <br />
      </span>
    );
  });

  const formattedExample = wordExample.split('\n').map((item, key) => {
    return (
      <span key={key}>
        {item}
        <br />
      </span>
    );
  });

  if (createDate) {
    const date = new Date(createDate);
    formattedDate = `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  }

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
      <div className={styles.title}>{wordName}</div>
      <p className={styles.description}>{formattedDescription}</p>
      <i className={styles.example}>{formattedExample}</i>
      <div className={styles.wrapper}>
        <p className={styles.date}>{formattedDate}</p> &nbsp;by&nbsp;
        <p className={styles.nickname}>{memberNickname}</p>
      </div>
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
