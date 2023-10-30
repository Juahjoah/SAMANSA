'use client';
//react & lib
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

//style
import styles from './page.module.css';

//component
import Input from '@/components/input';
import Card from '@/components/card';

interface Item {
  id: string;
  wordName: string;
  wordDescription: string;
  wordExample: string;
  hashtagList: string[];
  memberNickname: string;
  createDate: string;
}

export default function Home() {
  const searchParams = useSearchParams();
  const word = searchParams.get('word');
  const page = searchParams.get('page');

  const [value, setValue] = useState(word == null ? '' : word);
  const [data, setData] = useState([]);

  console.log('search' + word);
  console.log('search' + page);

  useEffect(() => {
    fetch(
      `https://samansa.kr/api/word/search?word=${word == null ? '' : word}`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((searchData) => {
        // console.log('사용자 정보 요청 성공:', userData);
        console.log(searchData);
        setData(searchData);
      })
      .catch(() => {
        // console.error('사용자 정보 요청 실패:', error);
      });
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.topTag}>
        <div className={styles.icon}>x</div>
        <div>40004</div>
      </div>
      <div className={styles.searchTag}>
        <div className={styles.searchInput}>
          <Input value={value} setValue={setValue} />
        </div>
        <div className={styles.createWord}>+</div>
      </div>
      <div className={styles.bottomTag}>
        {data.map((item: Item) => (
          <div key={item.id}>
            <Card
              title={item.wordName}
              content={item.wordDescription}
              example={item.wordExample}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
