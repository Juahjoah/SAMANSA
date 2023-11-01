'use client';
//react lib
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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

export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get('word');
  // const page = searchParams.get('page');

  const [value, setValue] = useState(search == null ? '' : search);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log('search : ' + search);
  // console.log('page : ' + page);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/word/search?word=${
        search == null ? '' : search
      }`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((searchData) => {
        // console.log('사용자 정보 요청 성공:', userData);
        setData(searchData);
        setLoading(true);
      })
      .catch(() => {
        // console.error('사용자 정보 요청 실패:', error);
      });
  }, []);

  function toCreate() {
    // window.location.href = `${process.env.NEXT_PUBLIC_REDIRECT_URI}/create`;
    window.location.href = '/create';
  }

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <div className={styles.searchInput}>
          <SearchInput value={value} />
        </div>
        <div className={styles.create}>
          <input
            value="+"
            type="button"
            className={styles.createButton}
            onClick={toCreate}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.searchResult}>
          {loading ? (
            data.length != 0 ? (
              data.map((item: CardItem) => (
                <div key={item.id}>
                  <Card item={item} />
                </div>
              ))
            ) : (
              <Card
                item={{
                  id: '',
                  wordName: '검색 결과가 없습니다.',
                  wordDescription: '철자가 맞는지 다시한번 확인해 보세요',
                  wordExample: '',
                  hashtagList: [''],
                  memberNickname: '',
                  createDate: '',
                }}
              />
            )
          ) : (
            <Card
              item={{
                id: '',
                wordName: '검색결과를 가져오는 중입니다.',
                wordDescription: '',
                wordExample: '',
                hashtagList: [''],
                memberNickname: '',
                createDate: '',
              }}
            />
          )}
        </div>
        <div>
          <div className={styles.survey}></div>
        </div>
      </div>
    </main>
  );
}
