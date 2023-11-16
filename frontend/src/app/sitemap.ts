import { MetadataRoute } from 'next';
import { resultData, CardItem } from '@/app/(main)/page';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/word/main`, {
    cache: 'no-store',
    headers: {
      'client-ip': '',
    },
  });

  const page = [
    {
      url: `${process.env.NEXT_PUBLIC_REDIRECT_URI}`,
      lastModified: new Date(),
    },
  ];
  let resData: resultData;
  if (res.ok) {
    resData = await res.json();
    page.push(
      ...resData.words.map((card: CardItem) => {
        return {
          url: `${
            process.env.NEXT_PUBLIC_REDIRECT_URI
          }/?type=word&amp;value=${encodeURIComponent(card.wordName)}`,
          lastModified: new Date(),
        };
      }),
    );
  } else {
    console.error(`HTTP Error: ${res.status}`);
    resData = { total: 0, words: [], error: true };
  }

  // console.log(page);
  for (let i = 1; i < resData.total; i++) {
    // 반복할 코드
    // console.log(i);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/word/main?&page=${i}`,
      {
        cache: 'no-store',
        headers: {
          'client-ip': '',
        },
      },
    );
    if (res.ok) {
      resData = await res.json();
      page.push(
        ...resData.words.map((card: CardItem) => {
          return {
            url: `${
              process.env.NEXT_PUBLIC_REDIRECT_URI
            }/?type=word&amp;value=${encodeURIComponent(card.wordName)}`,
            lastModified: new Date(),
          };
        }),
      );
    } else {
      console.error(`HTTP Error: ${res.status}`);
      // resData = { total: 0, words: [], error: true };
    }
  }

  return [...page];
}
