'use client';
//react & lib
import { useEffect, useState } from 'react';

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
  const [value, setValue] = useState('value');
  const [enter, setEnter] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (enter == true) {
      console.log('엔터 클릭됨 ');
      console.log(value);
      fetch(`https://samansa.kr/api/word/search?word=${value}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((searchData) => {
          // console.log('사용자 정보 요청 성공:', userData);
          console.log(searchData);
          setData(searchData);
        })
        .catch(() => {
          // console.error('사용자 정보 요청 실패:', error);
        });

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
