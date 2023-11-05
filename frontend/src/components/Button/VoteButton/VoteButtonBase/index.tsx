'use client';
import styles from './VoteButtonBase.module.css';

export default function VoteButtonBase(props: VoteButtonBaseProps) {
  return (
    <div className={styles.buttonRoot}>
      <button onClick={props.onVoteUp}>
        👍
        <span>{props.upVotes}</span>
      </button>
      <button onClick={props.onVoteDown}>
        👎
        <span>{props.downVotes}</span>
      </button>
    </div>
  );
}

type VoteButtonBaseProps = {
  onVoteUp: () => void;
  onVoteDown: () => void;
  upVotes: number;
  downVotes: number;
};
