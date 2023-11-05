'use client';
import VoteButtonBase from './VoteButtonBase';

export default function VoteButton(props: VoteButtonProps) {
  // TODO: api calls with hooks
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
