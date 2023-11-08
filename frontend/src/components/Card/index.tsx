import styles from './Card.module.css';
import VoteButton from '../Button/VoteButton';
import { CardItem } from '@/app/(main)/page';

export default function Card({ variant = 'large', item }: CardProps) {
  const {
    id,
    wordName,
    wordDescription,
    wordExample,
    memberNickname,
    createDate,
    likeCount,
    dislikeCount,
  } = item;

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
        <VoteButton wordId={id} {...{ likeCount, dislikeCount }} />
        {/* <VoteButton wordId={id} likeCount={55} dislikeCount={66} /> */}
        <p className={styles.date}>
          {formattedDate}&nbsp;by&nbsp;
          <span className={styles.nickname}>{memberNickname}</span>
        </p>
      </div>
    </div>
  );
}

type CardProps = {
  variant?: 'large' | 'medium' | 'small';
  item: CardItem;
};
