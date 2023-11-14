'use client';
import VoteButton, { Vote } from '../VoteButton';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

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
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export default function WordVoteButton({
  wordId,
  hasLike,
  hasDislike,
  upVotes,
  downVotes,
}: WordVoteButtonProps) {
  let initialVote: Vote = 'none';
  if (hasLike) initialVote = 'like';
  if (hasDislike) initialVote = 'dislike';

  const queryClient = useQueryClient();
  const updateVoteCountMutation = useMutation({
    mutationFn: updateVoteCount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['votes'] });
    },
  });

  const handleVoteChange = (newVote: Vote) => {
    if (newVote === 'like') {
      updateVoteCountMutation.mutate({ id: wordId, like: true });
    }
    if (newVote === 'dislike') {
      updateVoteCountMutation.mutate({ id: wordId, like: false });
    }
    console.debug(`Vote changed to ${newVote}`);
  };
  return (
    <VoteButton
      onVoteChange={handleVoteChange}
      userVote={initialVote}
      {...{ upVotes, downVotes }}
    />
  );
}

type WordVoteButtonProps = {
  wordId: string;
  hasLike: boolean;
  hasDislike: boolean;
  upVotes: number;
  downVotes: number;
};
type UpdateVoteCountRequest = {
  id: string;
  like: boolean;
};
