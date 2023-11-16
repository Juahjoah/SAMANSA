import { MetadataRoute } from 'next';
import { resultData } from '@/app/(main)/page';

//next

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/word/main`, {
    cache: 'no-store',
    headers: {
      'client-ip': '',
    },
  });

  let data: resultData;
  if (res.ok) {
    data = await res.json();
  } else {
    console.error(`HTTP Error: ${res.status}`);
    data = { total: 0, words: [], error: true };
  }

  const page = Array.from(
    { length: Math.ceil(data.total / 10) },
    (_, index) => index + 1,
  );

  return [
    {
      url: `${process.env.NEXT_PUBLIC_REDIRECT_URI}`,
      lastModified: new Date(),
    },
    ...page.map((pgNum) => {
      return {
        url: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/?page=${pgNum}`,
        lastModified: new Date(),
      };
    }),
  ];
}
