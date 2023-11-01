//style
import styles from './page.module.css';

//component
import SearchInput from '@/components/Input/SearchInput';
import Card from '@/components/Card';

type CardItem = {
  id: string;
  wordName: string;
  wordDescription: string;
  wordExample: string;
  hashtagList: string[];
  memberNickname: string;
  createDate: string;
};

async function fetchData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/word/main`, {
    cache: 'no-store',
  });
  const data: CardItem[] = await res.json();
  return data;
}

export default async function Home() {
  const CardData: CardItem[] = await fetchData();
  console.log(CardData);

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <div className={styles.searchInput}>
          <SearchInput />
        </div>
        <div className={styles.create}>
          <input value="+" type="button" className={styles.createButton} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.searchResult}>
          {CardData.map((item: CardItem) => (
            <div key={item.id}>
              <Card item={item} />
            </div>
          ))}
        </div>
        <div>
          <div className={styles.survey}></div>
        </div>
      </div>
    </main>
  );
}
