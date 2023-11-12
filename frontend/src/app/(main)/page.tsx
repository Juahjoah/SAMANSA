//react
// import { Suspense } from 'react';

//style
import styles from './Home.module.css';

//component
import Header from '@/components/Header';
import SearchInput from '@/components/Input/SearchInput';
import Card from '@/components/Card';
import Form from '@/components/Form';
import IndexButton from '@/components/Button/IndexButton';
import { EnterCreate } from '@/components/Button/RouteButton';
import Pagination from '@/components/Button/PaginationButton';

type Params = {
  type: string;
  value: string;
  page: number;
};

type getParams = {
  searchParams: Params;
};

export type CardItem = {
  id: string;
  wordName: string;
  wordDescription: string;
  wordExample: string;
  hashtagList: string[];
  memberNickname: string;
  createDate: string;
  likeCount: number;
  dislikeCount: number;
  hasLike: boolean;
  hasDislike: boolean;
  writer: boolean;
};

export type resultData = {
  total: number;
  words: CardItem[];
  error: boolean;
};

type fetchDataInput = {
  type: string;
  value: string;
  page: number;
};

async function fetchData({ type, value, page }: fetchDataInput) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/word/`;

  const encodedValue = encodeURIComponent(value)
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');

  switch (type) {
    //메인, 단어 검색
    case 'main':
    case 'search':
      url = `${url}${type}?word=${encodedValue}&page=${page - 1}`;
      break;
    //단어 완전 일치 조회
    case 'word':
      url = `${url}exact?word=${encodedValue}&memberNickname=&hashtag=&page=${
        page - 1
      }`;
      break;
    case 'nickname':
      url = `${url}exact?word=&memberNickname=${encodedValue}&hashtag=&page=${
        page - 1
      }`;
      break;
    case 'hashtag':
      url = `${url}exact?word=&memberNickname=&hashtag=${encodedValue}&page=${
        page - 1
      }`;
      break;
    //단어 초성 색인
    case 'index':
      url = `${url}index?startWith=${encodedValue}&page=${page - 1}`;
      break;
    case 'test':
      //test
      break;
    default:
      url = url + 'main';
      break;
  }
  // console.log(url);
  const res = await fetch(url, {
    cache: 'no-store',
  });

  if (res.ok) {
    const data: resultData = await res.json();
    return data;
  } else {
    console.error(`HTTP Error: ${res.status}`);
    const data: resultData = { total: 0, words: [], error: true };
    return data;
  }
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
  console.log('HomePage', type);
  console.log('HomePage', resultData);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.top}>
          <div className={styles.searchInput}>
            <SearchInput
              value={type == 'main' || type == 'search' ? value : ''}
            />
          </div>
          <div className={styles.index}>
            <IndexButton />
          </div>
          <div className={styles.create}>
            <EnterCreate />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.searchResult}>
            {resultData.words.length == 0 ? (
              resultData.error ? (
                <div className={styles.error}>잘못된 요청입니다.</div>
              ) : (
                <div className={styles.error}>검색결과가 없습니다.</div>
              )
            ) : (
              resultData.words.map((item: CardItem) => {
                console.log('CardItem', item);
                return (
                  <div key={item.id}>
                    <Card item={item} />
                  </div>
                );
              })
            )}
          </div>
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
