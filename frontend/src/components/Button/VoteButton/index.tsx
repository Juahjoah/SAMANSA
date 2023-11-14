'use client';
import { useEffect, useReducer } from 'react';
import { IoThumbsUpSharp, IoThumbsDownSharp } from 'react-icons/io5';
import styles from './VoteButton.module.css';

// A general vote button that can be used for any voteable entity which
// is not dependent on any specific API.
export default function VoteButton({
  upVotes,
  downVotes,
  userVote,
  onVoteChange,
}: VoteButtonProps) {
  const initialState: VoteState = { upVotes, downVotes, userVote };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    onVoteChange(state.userVote);
  }, [onVoteChange, state.userVote]);

  return (
    <div className={styles.buttonRoot}>
      <button
        onClick={() => dispatch({ type: 'like' })}
        className={
          state.userVote === 'like' ? styles.buttonSelected : styles.button
        }
      >
        <IoThumbsUpSharp />
        <span>{state.upVotes}</span>
      </button>
      <button
        onClick={() => dispatch({ type: 'dislike' })}
        className={
          state.userVote === 'dislike' ? styles.buttonSelected : styles.button
        }
      >
        <IoThumbsDownSharp />
        <span>{state.downVotes}</span>
      </button>
    </div>
  );
}

// Given the current state and an action ("like" or "dislike"), return the updated state
const reducer = (state: VoteState, action: VoteAction): VoteState => {
  switch (action.type) {
    // User clicked like button
    case 'like':
      switch (state.userVote) {
        // No vote → like as requested
        case 'none':
          return {
            ...state,
            userVote: 'like',
            upVotes: state.upVotes + 1,
          };
        // Already liked → remove like
        case 'like':
          return {
            ...state,
            userVote: 'none',
            upVotes: Math.max(state.upVotes - 1, 0),
          };
        // Currently disliked → change to like
        case 'dislike':
          return {
            ...state,
            userVote: 'like',
            upVotes: state.upVotes + 1,
            downVotes: Math.max(state.downVotes - 1, 0),
          };
      }
      break;
    // User clicked dislike button
    case 'dislike':
      switch (state.userVote) {
        // No vote → dislike as requested
        case 'none':
          return {
            ...state,
            userVote: 'dislike',
            downVotes: state.downVotes + 1,
          };
        // Already disliked → remove dislike
        case 'dislike':
          return {
            ...state,
            userVote: 'none',
            downVotes: Math.max(state.downVotes - 1, 0),
          };
        // Currently liked → change to dislike
        case 'like':
          return {
            ...state,
            userVote: 'dislike',
            upVotes: Math.max(state.upVotes - 1, 0),
            downVotes: state.downVotes + 1,
          };
      }
      break;
    default:
      return state;
  }
};

export type Vote = 'like' | 'dislike' | 'none';

type VoteAction = { type: 'like' } | { type: 'dislike' };

type VoteState = {
  upVotes: number;
  downVotes: number;
  userVote: Vote;
};

type VoteButtonProps = {
  onVoteChange: (vote: Vote) => void;
} & VoteState;
