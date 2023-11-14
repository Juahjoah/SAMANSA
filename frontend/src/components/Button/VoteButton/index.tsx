'use client';

import { IoThumbsUpSharp, IoThumbsDownSharp } from 'react-icons/io5';
import styles from './VoteButton.module.css';
import { useState } from 'react';
import { resultData } from '@/app/(main)/page';

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
  console.log(response);
  if (response.ok) {
    const data: resultData = await response.json();
    console.log('like data : ', data);
    return true;
  } else {
    console.error(`HTTP Error: ${response.status}`);
    return false;
  }
}

async function getUpdatedInfo(id: string) {
  const response = await fetch(`${BASE_URL}/word/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'client-ip': '',
    },
  });

  // console.log('res', response);
  if (response.ok) {
    const data: resultData = await response.json();
    console.log('word data : ', data);
    return data.words[0];
  } else {
    console.error(`HTTP Error: ${response.status}`);
    return null;
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
  const [state, setState] = useState({
    id,
    likeCount,
    dislikeCount,
    hasLike,
    hasDislike,
  });

  async function Click(like: string) {
    console.log('click');

    const updateSucess: boolean = await updateVoteCount({ id, like });
    if (updateSucess) {
      const result: WordVoteButton | null = await getUpdatedInfo(id);
      console.log('set result', result);
      if (result != null) {
        setState(result);
      }
      console.log(state);
    }
  }

  return (
    <div className={styles.buttonRoot}>
      {/* 좋아요 */}
      <button
        onClick={() => Click('UP')}
        className={state.hasLike ? styles.buttonSelected : styles.button}
      >
        <IoThumbsUpSharp />
        <span>{state.likeCount}</span>
      </button>
      {/* 싫어요 */}
      <button
        onClick={() => Click('DOWN')}
        className={state.hasDislike ? styles.buttonSelected : styles.button}
      >
        <IoThumbsDownSharp />
        <span>{state.dislikeCount}</span>
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
