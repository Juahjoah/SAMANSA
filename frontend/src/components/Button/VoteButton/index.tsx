'use client';

import { IoThumbsUpSharp } from '@react-icons/all-files/io5/IoThumbsUpSharp';
import { IoThumbsDownSharp } from '@react-icons/all-files/io5/IoThumbsDownSharp';
import styles from './VoteButton.module.css';
import { useState } from 'react';
// import { resultData } from '@/app/(main)/page';

/// Vote button specific to words.
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
async function updateVoteCount({ id, like }: UpdateVoteCountRequest) {
  const response = await fetch(`${BASE_URL}/word/like`, {
    headers: {
      'Content-Type': 'application/json',
      'client-ip': '',
    },
    method: 'PUT',
    body: JSON.stringify({ wordId: id, wordLike: like }),
  });
  // console.log(response);
  if (response.ok) {
    // const data: resultData = await response.json();
    // console.log('like data : ', data);
    return true;
  } else {
    console.error(`HTTP Error: ${response.status}`);
    return false;
  }
}

export default function VoteButton({
  id,
  likeCount,
  dislikeCount,
  hasLike,
  hasDislike,
}: WordVoteButton) {
  // 상태관리
  const like = likeCount - (hasLike ? 1 : 0);
  const dislike = dislikeCount - (hasDislike ? 1 : 0);
  const [state, setState] = useState(
    hasLike ? 'UP' : hasDislike ? 'DOWN' : 'NONE',
  );

  async function Click(action: string) {
    // console.log('click');
    let like = '';
    if (action == state) {
      like = 'NONE';
    } else {
      like = action;
    }
    const updateSucess: boolean = await updateVoteCount({ id, like });
    if (updateSucess) {
      setState(like);
    }
  }

  return (
    <div className={styles.buttonRoot}>
      {/* 좋아요 */}
      <button
        onClick={() => Click('UP')}
        className={state == 'UP' ? styles.buttonSelected : styles.button}
      >
        <IoThumbsUpSharp />
        <span>{like + (state == 'UP' ? 1 : 0)}</span>
      </button>
      {/* 싫어요 */}
      <button
        onClick={() => Click('DOWN')}
        className={state == 'DOWN' ? styles.buttonSelected : styles.button}
      >
        <IoThumbsDownSharp />
        <span>{dislike + (state == 'DOWN' ? 1 : 0)}</span>
      </button>
    </div>
  );
}

type UpdateVoteCountRequest = {
  id: string;
  like: string;
};

type WordVoteButton = {
  id: string;
  likeCount: number;
  dislikeCount: number;
  hasLike: boolean;
  hasDislike: boolean;
};
