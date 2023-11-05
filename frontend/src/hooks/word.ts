const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function updateVoteCount(id: string, like: boolean) {
  const response = await fetch(`${BASE_URL}/word/like`, {
    method: 'PUT',
    body: JSON.stringify({ wordId: id, wordLike: like }),
  });
  return response.json();
}

export default function useWord() {}
