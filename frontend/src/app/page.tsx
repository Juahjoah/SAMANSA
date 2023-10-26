'use client';
//react & lib
import { use, useEffect, useState } from 'react';

//style
import styles from './page.module.css';

//component
import Input from '@/components/input';
import Card from '@/components/card';
import Pagination from '@/components/button/Pagination';

interface Item {
  id: string;
  wordName: string;
  wordDescription: string;
  wordExample: string;
  hashtagList: string[];
  memberNickname: string;
  createDate: string;
}

export async function fetchData(setData: (e: any) => void | any, word: string) {
  const res = await fetch('https://samansa.kr/api/word/search?word=' + word);
  const data = await res.json();
  setData(data);
}

export default function Home() {
  const [value, setValue] = useState('value');
  const [enter, setEnter] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (enter == true) {
      console.log('엔터 클릭됨 ');
      console.log(value);
      fetchData(setData, value);
      setEnter(false);
    } else {
      console.log('false');
    }
  }, [enter]);
  return (
    <main className={styles.main}>
      <div className={styles.topTag}>
        <div className={styles.icon}>x</div>
        <div>40004</div>
      </div>
      <div className={styles.searchTag}>
        <div className={styles.searchInput}>
          <Input value={value} setValue={setValue} setEnter={setEnter} />
        </div>
        <div className={styles.createWord}>+</div>
      </div>
      <div className={styles.bottomTag}>
        {data.map((item: Item) => (
          <div>
            <Card
              title={item.wordName}
              content={item.wordDescription}
              example={item.wordExample}
            />
          </div>
        ))}
      </div>

      <Pagination></Pagination>
    </main>
  );
}
