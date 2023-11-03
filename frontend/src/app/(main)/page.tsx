//react
import { Suspense } from 'react';

//style
import styles from './page.module.css';

//component
import SearchInput from '@/components/Input/SearchInput';
import Card from '@/components/Card';
import Form from '@/components/Form';
import { EnterCreate } from '@/components/Button/RouteButton';
import Pagination from '@/components/Button/PaginationButton';

type Params = {
  word: string;
  page: string;
};

type getParams = {
  searchParams: Params;
};

type CardItem = {
  id: string;
  wordName: string;
  wordDescription: string;
  wordExample: string;
  hashtagList: string[];
  memberNickname: string;
  createDate: string;
};

type resultData = {
  total: number;
  words: CardItem[];
};

type fetchDataInput = {
  value: string;
  page: number;
};

async function fetchData({ value, page }: fetchDataInput) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/word/${
      value == '' ? `main?` : `search?word=${value}&`
    }page=${page - 1}`,
    {
      cache: 'no-store',
    },
  );
  const data: resultData = await res.json();
  return data;
}

export default async function Home({ searchParams }: getParams) {
  const search = searchParams.word;
  const pageParam = searchParams.page;

  const page = pageParam == null ? 1 : parseInt(pageParam);
  const value = search == null ? '' : search;

  const resultData: resultData = await fetchData({ value, page });

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <div className={styles.searchInput}>
          <SearchInput value={value} />
        </div>
        <div className={styles.create}>
          <EnterCreate />
        </div>
      </div>
      <div className={styles.content}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className={styles.searchResult}>
            {resultData.words.map((item: CardItem) => (
              <div key={item.id}>
                <Card item={item} />
              </div>
            ))}
          </div>
        </Suspense>
        <div className={styles.survey}>
          <Form />
        </div>
      </div>
      <div className={styles.bottom}>
        <Pagination word={value} total={resultData.total} page={page - 1} />
      </div>
    </main>
  );
}
