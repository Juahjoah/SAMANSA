'use client';
import VoteButtonBase from './VoteButtonBase';
// import { headers } from 'next/headers';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { VoteState } from './VoteButtonBase';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
async function updateVoteCount({ id, like }: UpdateVoteCountRequest) {
  // const headersList = headers();
  // const ip = headersList.get('x-forwarded-for');

  const response = await fetch(`${BASE_URL}/word/like`, {
    headers: {
      'Content-Type': 'application/json',
      // 'client-ip': ip != null ? ip : '',
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

  const handleLike = () => {
    if (voteState === VoteState.UP) {
      setVoteState(VoteState.NONE);
      updateVoteCountMutation.mutate({ id: wordId, like: true });
      return;
    }
    setVoteState(VoteState.UP);
    updateVoteCountMutation.mutate({ id: wordId, like: true });
  };
  const handleDislike = () => {
    if (voteState === VoteState.DOWN) {
      setVoteState(VoteState.NONE);
      updateVoteCountMutation.mutate({ id: wordId, like: false });
      return;
    }
    setVoteState(VoteState.DOWN);
    updateVoteCountMutation.mutate({ id: wordId, like: false });
  };

  return (
    <VoteButtonBase
      onVoteDown={handleDislike}
      onVoteUp={handleLike}
      upVotes={likeCount} //voteState === VoteState.UP ? likeCount + 1 :
      downVotes={dislikeCount} //voteState === VoteState.DOWN ? dislikeCount + 1 :
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
