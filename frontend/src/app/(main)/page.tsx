//react
import { Suspense } from 'react';

//style
import styles from './Home.module.css';

//component
import Header from '@/components/Header';
import SearchInput from '@/components/Input/SearchInput';
import Card from '@/components/Card';
import Form from '@/components/Form';
import { EnterCreate } from '@/components/Button/RouteButton';
import Pagination from '@/components/Button/PaginationButton';
import IndexButton from '@/components/Button/IndexButton';

type Params = {
  type: string;
  value: string;
  page: number;
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
  type: string;
  value: string;
  page: number;
};

async function fetchData({ type, value, page }: fetchDataInput) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/word/`;

  switch (type) {
    case 'main':
    case 'search':
      url = `${url}${type}?word=${value}&page=${page - 1}`;
      break;
    case 'test':
      //test
      break;

    default:
      break;
  }

  const res = await fetch(url, {
    cache: 'no-store',
  });
  const data: resultData = await res.json();
  return data;
}

export default async function Home({ searchParams }: getParams) {
  const typeParam = searchParams.type;
  const valueParam = searchParams.value;
  const pageParam = searchParams.page;
  const type = typeParam == null ? 'main' : typeParam;
  const value = valueParam == null ? '' : valueParam;
  const page = pageParam == null ? 1 : pageParam;

  const resultData: resultData = await fetchData({
    type,
    value,
    page,
  });

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.top}>
          <div className={styles.searchInput}>
            <SearchInput value={value} />
          </div>
          <IndexButton></IndexButton>
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
          <Pagination
            type={type}
            value={value}
            pagination={{ total: resultData.total, page: page }}
          />
        </div>
      </main>
    </>
  );
}
