'use client';
import styles from './VoteButtonBase.module.css';
import { IoThumbsUpSharp } from 'react-icons/io5';
import { IoThumbsDownSharp } from 'react-icons/io5';

export enum VoteState {
  UP,
  DOWN,
  NONE,
}

export default function VoteButtonBase({
  onVoteUp,
  upVotes,
  onVoteDown,
  downVotes,
  voteState,
  isLiked,
  isDisliked,
}: VoteButtonBaseProps) {
  if (isLiked) {
    voteState = VoteState.UP;
  }
  if (isDisliked) {
    voteState = VoteState.DOWN;
  }
  return (
    <div className={styles.buttonRoot}>
      <button
        onClick={onVoteUp}
        className={
          voteState === VoteState.UP ? styles.buttonSelected : styles.button
        }
      >
        <IoThumbsUpSharp />
        <span>{upVotes}</span>
      </button>
      <button
        onClick={onVoteDown}
        className={
          voteState === VoteState.DOWN ? styles.buttonSelected : styles.button
        }
      >
        <IoThumbsDownSharp />
        <span>{downVotes}</span>
      </button>
    </div>
  );
}

type VoteButtonBaseProps = {
  onVoteUp: () => void;
  onVoteDown: () => void;
  upVotes: number;
  downVotes: number;
  voteState: VoteState;
  isLiked: boolean;
  isDisliked: boolean;
};
