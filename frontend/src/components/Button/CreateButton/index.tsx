'use client';
import styles from './CreateButton.module.css';
import { useRouter } from 'next/navigation';

// api 요청 함수
export async function postData(url = '', data = {}) {
  const accessToken: string | null =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('accessToken')
      : null;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// 단어 등록 버튼
export default function CreateButton({
  word,
  meaning,
  example,
  hashTag,
}: {
  word: string;
  meaning: string;
  example: string;
  hashTag: string;
}) {
  const url = 'https://samansa.kr/api/word'; // api요청 url
  const data = {
    wordName: word,
    wordDescription: meaning,
    wordExample: example,
    wordHashtag: hashTag,
  }; // 등록할 단어 정보
  const router = useRouter();

  // 단어 등록 요청
  const CreateWord = async () => {
    if (!word || !meaning) {
      alert('빈 값이 있습니다. 값을 채워주세요!');
    } else {
      postData(url, data)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
      router.push('/');
    }
  };
  // 단어 등록 취소
  const CancleWord = () => {
    router.push('/');
  };
  return (
    <div className={styles.createDiv}>
      <div className={styles.cancle} onClick={CancleWord}>
        취소하기
      </div>
      <div className={styles.create} onClick={CreateWord}>
        등록하기
      </div>
    </div>
  );
}
