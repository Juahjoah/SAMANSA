'use client';
import VoteButtonBase from './VoteButtonBase';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
async function updateVoteCount(id: string, like: boolean) {
  const response = await fetch(`${BASE_URL}/word/like`, {
    method: 'PUT',
    body: JSON.stringify({ wordId: id, wordLike: like }),
  });
  return response.json();
}

export default function VoteButton(props: VoteButtonProps) {
  const queryClient = useQueryClient();
  const updateVoteCountMutation = useMutation({
    mutationFn: updateVoteCount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['votes'] });
    },
  });
  return (
    <VoteButtonBase
      onVoteDown={() => console.log('down')}
      onVoteUp={() => console.log('up')}
      upVotes={120}
      downVotes={10}
    />
  );
}

type VoteButtonProps = {
  wordId?: string;
};
