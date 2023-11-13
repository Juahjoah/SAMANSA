import styles from './Card.module.css';
import VoteButton from '../Button/VoteButton';
import { CardItem } from '@/app/(main)/page';
import ShareButton from '../Button/ShareButton';
import DeleteButton from '../Button/DeleteButton';
import ReportButton from '../Button/ReportButton';

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
    hasLike,
    hasDislike,
    hashtagList,
  } = item;

  let formattedDate = '';

  console.log('In CardComponent', item);
  const requestData = { id, memberNickname };
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
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          <a
            href={`${process.env.NEXT_PUBLIC_REDIRECT_URI}?type=word&value=${wordName}`}
          >
            {wordName}
          </a>
        </div>
        <ShareButton wordName={wordName} />
      </div>
      <p className={styles.description}>{formattedDescription}</p>
      <i className={styles.example}>{formattedExample}</i>
      <div className={styles.hashtag}>
        {hashtagList.map((hashtag, index) => (
          <a
            key={index}
            href={`${process.env.NEXT_PUBLIC_REDIRECT_URI}?type=hashtag&value=${hashtag}`}
          >
            <span key={index}>#{hashtag}</span>
          </a>
        ))}
      </div>
      <div className={styles.wrapper}>
        <div className={styles.wrapperChildren}>
          <VoteButton
            wordId={id}
            {...{ likeCount, dislikeCount, hasLike, hasDislike }}
          />
          <div className={styles.optionGroup}>
            <DeleteButton requestData={requestData} />
            <ReportButton requestData={requestData} />
          </div>
        </div>

        <p className={styles.date}>
          {formattedDate}&nbsp;by&nbsp;
          <span className={styles.nickname}>
            <a
              href={`${process.env.NEXT_PUBLIC_REDIRECT_URI}?type=nickname&value=${memberNickname}`}
            >
              {memberNickname}
            </a>
          </span>
        </p>
      </div>
    </div>
  );
}

type CardProps = {
  variant?: 'large' | 'medium' | 'small';
  item: CardItem;
};
