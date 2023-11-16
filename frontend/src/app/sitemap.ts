import { MetadataRoute } from 'next';
import { resultData, CardItem } from '@/app/(main)/page';

//next

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/word/main`, {
    cache: 'no-store',
    headers: {
      'client-ip': '',
    },
  });

  const data = [];
  let resData: resultData;
  if (res.ok) {
    resData = await res.json();
  } else {
    console.error(`HTTP Error: ${res.status}`);
    resData = { total: 0, words: [], error: true };
  }

  for (let i = 0; i < resData.total; i++) {
    // 반복할 코드

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/word/main?word=&page=${i}`,
      {
        cache: 'no-store',
        headers: {
          'client-ip': '',
        },
      },
    );

    if (res.ok) {
      resData = await res.json();
      data.push(...resData.words);
    } else {
      console.error(`HTTP Error: ${res.status}`);
      // resData = { total: 0, words: [], error: true };
    }
  }

  return [
    {
      url: `${process.env.NEXT_PUBLIC_REDIRECT_URI}`,
      lastModified: new Date(),
    },
    ...data.map((card: CardItem) => {
      return {
        url: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/?type=word&value=${card.wordName}`,
        lastModified: new Date(),
      };
    }),
  ];
}
