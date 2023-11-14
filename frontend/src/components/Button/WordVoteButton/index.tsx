'use client';

import { IoThumbsUpSharp, IoThumbsDownSharp } from 'react-icons/io5';
import { useState } from 'react';
import { resultData } from '@/app/(main)/page';

/// Vote button specific to words.
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
async function updateVoteCount({ id, like }: UpdateVoteCountRequest) {
  const response = await fetch(`${BASE_URL}/word/like`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({ wordId: id, wordLike: like }),
  });
  if (response.ok) {
    const data: resultData = await response.json();
    return data.words[0];
  } else {
    console.error(`HTTP Error: ${response.status}`);
    return null;
  }
}

export default function WordVoteButton({
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

  async function Click(likeState: string) {
    console.log('click');
    const result: WordVoteButton | null = await updateVoteCount({
      id: id,
      like: likeState,
    });
    if (result != null) {
      setState(result);
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
