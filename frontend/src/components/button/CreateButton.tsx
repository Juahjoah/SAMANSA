'use client';
import styles from './CreateButton.module.css';
import { useRouter } from 'next/navigation';

// api 요청 함수
export async function postData(url = '', data = {}) {
  const Token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLtmITspIAiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjk4NzI2NzUwfQ.9YXootWakWS-RFleKe3tVbhTlCBvxmk3G_wguYNUIvQ';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Token}`,
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
  const url = 'http://h4r1b0.net:5000/api/word'; // api요청 url
  const data = {
    wordName: word,
    wordDescription: meaning,
    wordExample: example,
    wordHashtag: hashTag,
  }; // 등록할 단어 정보
  const router = useRouter();

  // 단어 등록 요청
  const CreateWord = async () => {
    console.log(data);
    postData(url, data)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 단어 등록 취소
  const CancleWord = () => {
    router.push('/auth/login');
  };
  return (
    <div className={styles.createDiv}>
      <div className={styles.create} onClick={CreateWord}>
        등록하기
      </div>
      <div className={styles.cancle} onClick={CancleWord}>
        취소하기
      </div>
    </div>
  );
}
