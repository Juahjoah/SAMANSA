'use client';
import VoteButtonBase from './VoteButtonBase';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { VoteState } from './VoteButtonBase';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
async function updateVoteCount({ id, like }: UpdateVoteCountRequest) {
  const response = await fetch(`${BASE_URL}/word/like`, {
    headers: {
      'Content-Type': 'application/json',
      // 'x-forwarded-for': '192.168.31.210',
    },
    method: 'PUT',
    body: JSON.stringify({ wordId: id, wordLike: like }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export default function VoteButton({
  wordId,
  likeCount,
  dislikeCount,
  hasLike,
  hasDislike,
}: VoteButtonProps) {
  const queryClient = useQueryClient();
  const updateVoteCountMutation = useMutation({
    mutationFn: updateVoteCount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['votes'] });
    },
  });

  let initialVoteState = VoteState.NONE;
  if (hasLike) initialVoteState = VoteState.UP;
  if (hasDislike) initialVoteState = VoteState.DOWN;

  const [voteState, setVoteState] = useState(initialVoteState);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const [dislikeCountState, setDislikeCountState] = useState(dislikeCount);

  useEffect(() => {
    if (hasLike) setLikeCountState((prev) => prev - 1);
    if (hasDislike) setDislikeCountState((prev) => prev - 1);
  }, [hasLike, hasDislike]);

  // const handleLike = () => {
  //   if (voteState === VoteState.UP) {
  //     setVoteState(VoteState.NONE);
  //     updateVoteCountMutation.mutate({ id: wordId, like: true });
  //     return;
  //   }
  //   setVoteState(VoteState.UP);
  //   updateVoteCountMutation.mutate({ id: wordId, like: true });
  // };
  // const handleDislike = () => {
  //   if (voteState === VoteState.DOWN) {
  //     setVoteState(VoteState.NONE);
  //     updateVoteCountMutation.mutate({ id: wordId, like: false });
  //     return;
  //   }
  //   setVoteState(VoteState.DOWN);
  //   updateVoteCountMutation.mutate({ id: wordId, like: false });
  // };
  const handleLike = () => {
    let newLikeCount = likeCount;
    let newDislikeCount = dislikeCount;

    if (voteState === VoteState.UP) {
      // 이미 좋아요가 눌린 상태
      setVoteState(VoteState.NONE);
      newLikeCount -= 1;
    } else {
      if (voteState === VoteState.DOWN) {
        // 싫어요가 눌린 상태면 취소
        newDislikeCount -= 1;
      }
      setVoteState(VoteState.UP);
      newLikeCount += 1;
    }

    setLikeCountState(newLikeCount);
    setDislikeCountState(newDislikeCount);
    updateVoteCountMutation.mutate({ id: wordId, like: true });
  };

  const handleDislike = () => {
    let newLikeCount = likeCount;
    let newDislikeCount = dislikeCount;

    if (voteState === VoteState.DOWN) {
      // 이미 싫어요가 눌린 상태
      setVoteState(VoteState.NONE);
      newDislikeCount -= 1;
    } else {
      if (voteState === VoteState.UP) {
        // 좋아요가 눌린 상태면 취소
        newLikeCount -= 1;
      }
      setVoteState(VoteState.DOWN);
      newDislikeCount += 1;
    }

    setLikeCountState(newLikeCount);
    setDislikeCountState(newDislikeCount);
    updateVoteCountMutation.mutate({ id: wordId, like: false });
  };

  return (
    <VoteButtonBase
      onVoteDown={handleDislike}
      onVoteUp={handleLike}
      upVotes={likeCountState}
      downVotes={dislikeCountState}
      voteState={voteState}
    />
  );
}

type VoteButtonProps = {
  wordId: string;
  likeCount: number;
  dislikeCount: number;
  hasLike: boolean;
  hasDislike: boolean;
};

type UpdateVoteCountRequest = {
  id: string;
  like: boolean;
};
