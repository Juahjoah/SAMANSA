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

  let initialVoteState = VoteState.NONE;
  if (hasLike) initialVoteState = VoteState.UP;
  if (hasDislike) initialVoteState = VoteState.DOWN;

  const [voteState, setVoteState] = useState<VoteState>(initialVoteState);
  const [upVotes, setUpVotes] = useState(likeCount);
  const [downVotes, setDownVotes] = useState(dislikeCount);

  const handleLike = () => {
    // if it's already liked, initialLikeCount - 1
    if (voteState === VoteState.UP) {
      setVoteState(VoteState.NONE);
      setUpVotes(likeCount - 1);
      updateVoteCountMutation.mutate({ id: wordId, like: true });
      return;
    }
    // newly like, set Dislike with original dislikeCount
    setVoteState(VoteState.UP);
    setUpVotes(upVotes + 1);
    setDownVotes(dislikeCount);
    updateVoteCountMutation.mutate({ id: wordId, like: true });
    // if already disliked, remove the dislike and add the like
    if (voteState === VoteState.DOWN) {
      setDownVotes(downVotes - 1);
      setUpVotes(likeCount + 1);
    }
  };
  const handleDislike = () => {
    // if it's already disliked, remove the dislike
    if (voteState === VoteState.DOWN) {
      setVoteState(VoteState.NONE);
      setDownVotes(downVotes - 1);
      updateVoteCountMutation.mutate({ id: wordId, like: false });
      return;
    }
    // newly dislike, set Like with original likeCount
    setVoteState(VoteState.DOWN);
    setDownVotes(downVotes + 1);
    setUpVotes(likeCount);
    updateVoteCountMutation.mutate({ id: wordId, like: false });
    // if already liked, remove the like and add the dislike
    if (voteState === VoteState.UP) {
      setUpVotes(upVotes - 1);
      setDownVotes(dislikeCount + 1);
    }
  };

  return (
    <VoteButtonBase
      onVoteDown={handleDislike}
      onVoteUp={handleLike}
      upVotes={upVotes}
      downVotes={downVotes}
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
