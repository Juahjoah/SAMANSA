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
    // 이미 좋아요를 했다 -> 그럼 원래 좋아요 값에서 -1을 때려야함...
    if (voteState === VoteState.UP) {
      setVoteState(VoteState.NONE);
      setUpVotes(likeCount - 1);
      updateVoteCountMutation.mutate({ id: wordId, like: true });
      return;
    }
    // if already disliked, remove the dislike and add the like
    // 이미 싫어요를 한 상황에서 좋아요를 눌렀다 -> 원래 싫어요를 -1 하고 원래 좋아요를 + 1...
    if (voteState === VoteState.DOWN) {
      setDownVotes(dislikeCount - 1);
      setUpVotes(likeCount + 1);
      updateVoteCountMutation.mutate({ id: wordId, like: true });
      return;
    }
    // newly like, set Dislike with original dislikeCount
    // 새로 좋아요를 누른다...? 싫어요 값은 그냥 원래 오리지널 dislikeCount로 해주면 됨...
    setVoteState(VoteState.UP);
    setUpVotes(likeCount + 1);
    setDownVotes(dislikeCount);
    updateVoteCountMutation.mutate({ id: wordId, like: true });
  };
  const handleDislike = () => {
    // if it's already disliked, remove the dislike
    // 이미 싫어요를 눌렀다 -> 원래 싫어요 값에서 -1을 해줘야함
    if (voteState === VoteState.DOWN) {
      setVoteState(VoteState.NONE);
      setDownVotes(dislikeCount - 1);
      updateVoteCountMutation.mutate({ id: wordId, like: false });
      return;
    }
    // if already liked, remove the like and add the dislike
    // 이미 좋아요를 누른 상황인데, 싫어요를 눌렀다? 그러면 원래 좋아요 값을 -1 해주고 기존 싫어요를 +1
    if (voteState === VoteState.UP) {
      setUpVotes(likeCount - 1);
      setDownVotes(dislikeCount + 1);
      updateVoteCountMutation.mutate({ id: wordId, like: false });
      return;
    }
    // newly dislike, set Like with original likeCount
    // 새로 싫어요를 누른다, 싫어요를 + 1해주고, 좋아요는 기존 좋아요값 그대로 넣어준다...
    // ... 울고싶군 ^^...?
    setVoteState(VoteState.DOWN);
    setDownVotes(dislikeCount + 1);
    setUpVotes(likeCount);
    updateVoteCountMutation.mutate({ id: wordId, like: false });
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
