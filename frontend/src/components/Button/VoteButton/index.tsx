'use client';
import VoteButtonBase from './VoteButtonBase';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { VoteState } from './VoteButtonBase';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
async function updateVoteCount({ id, like }: UpdateVoteCountRequest) {
  const response = await fetch(`${BASE_URL}/word/like`, {
    headers: {
      'Content-Type': 'application/json',
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

  const [voteState, setVoteState] = useState(VoteState.NONE);

  const handleLike = () => {
    if (voteState === VoteState.UP) {
      setVoteState(VoteState.NONE);
      likeCount -= 1;
      updateVoteCountMutation.mutate({ id: wordId, like: false });
      return;
    }
    setVoteState(VoteState.UP);
    updateVoteCountMutation.mutate({ id: wordId, like: true });
  };
  const handleDislike = () => {
    if (voteState === VoteState.DOWN) {
      setVoteState(VoteState.NONE);
      dislikeCount -= 1;
      updateVoteCountMutation.mutate({ id: wordId, like: true });
      return;
    }
    setVoteState(VoteState.DOWN);
    updateVoteCountMutation.mutate({ id: wordId, like: false });
  };

  return (
    <VoteButtonBase
      onVoteDown={handleDislike}
      onVoteUp={handleLike}
      upVotes={voteState === VoteState.UP ? likeCount + 1 : likeCount}
      downVotes={voteState === VoteState.DOWN ? dislikeCount + 1 : dislikeCount}
      voteState={voteState}
      isLiked={hasLike}
      isDisliked={hasDislike}
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
