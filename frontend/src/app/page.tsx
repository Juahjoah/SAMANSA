//style
import styles from './page.module.css';

//component
import SearchInput from '@/components/Input/SearchInput';
import Card from '@/components/Card';
import Form from '@/components/Form';
import { EnterCreate } from '@/components/Button/RouteButton';
import Pagination from '@/components/Button/PaginationButton';

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

async function fetchData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/word/main`, {
    cache: 'no-store',
  });
  const data: resultData = await res.json();
  // console.log(data);
  return data;
}

export default async function Home() {
  const resultData: resultData = await fetchData();

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <div className={styles.searchInput}>
          <SearchInput />
        </div>
        <div className={styles.create}>
          <EnterCreate />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.searchResult}>
          {resultData.words.map((item: CardItem) => (
            <div key={item.id}>
              <Card item={item} />
            </div>
          ))}
        </div>
        <div>
          <div className={styles.survey}>
            <Form />
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Pagination word={''} total={resultData.total} page={0} />
      </div>{' '}
    </main>
  );
}
