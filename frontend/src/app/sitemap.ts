import { MetadataRoute } from 'next';
// import { fetchData, resultData } from '@/app/(main)/page';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const data: resultData | null = await fetchData({
  //   type: 'main',
  //   value: '',
  //   page: 0,
  // });

  const total = 60; //data == null ? 0 : data.total;

  const page = [];

  for (let i = 1; i <= total; i++) {
    page.push(i);
  }
  return [
    {
      url: `${process.env.NEXT_PUBLIC_REDIRECT_URI}`,
      lastModified: new Date(),
    },
    ...page.map((pgNum) => {
      return {
        url: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/page=${pgNum}`,
        lastModified: new Date(),
      };
    }),
  ];
}
