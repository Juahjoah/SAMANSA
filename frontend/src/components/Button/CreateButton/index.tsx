'use client';
import styles from './CreateButton.module.css';
// import { useRouter } from 'next/navigation';

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
  // const url = 'https://samansa.kr/api/word'; // api요청 url
  const data = {
    wordName: word,
    wordDescription: meaning,
    wordExample: example,
    wordHashtag: hashTag,
  }; // 등록할 단어 정보

  // 앞뒤 띄어쓰기 제거
  const replacWord = word.replace(/^\s+|\s+$/gm, '');
  const replacDescription = meaning.replace(/^\s+|\s+$/gm, '');
  const replacExample = example.replace(/^\s+|\s+$/gm, '');

  const url = `${process.env.NEXT_PUBLIC_REDIRECT_URI}/`;

  // 단어 등록 요청
  const CreateWord = async () => {
    if (!replacWord) {
      alert('단어입력이 안되어있어요!');
    } else if (!replacDescription) {
      alert('단어의 정의가 없어요.');
    } else if (!replacExample) {
      alert('예시문장이 필요해요!');
    } else {
      postData(`${url}/api/word`, data)
        .then((data) => {
          console.log(data);
          window.location.href = url;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // 단어 등록 취소
  const CancleWord = () => {
    window.location.href = url;
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
