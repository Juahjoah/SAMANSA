'use client';

import styles from './ShareButton.module.css';

import { useRouter } from 'next/navigation';

import { RiTwitterXFill } from 'react-icons/ri';
import { RiFacebookFill } from 'react-icons/ri';

type ButtonProps = {
  wordName?: string;
};

export default function ShareButton({ wordName }: ButtonProps) {
  const router = useRouter();
  const sendText = ''; // 전달할 텍스트
  const sendUrl = `${process.env.NEXT_PUBLIC_REDIRECT_URI}`; // 전달할 URL

  const ShareTwitter = () => {
    // 트위터 공유하기 페이지 이동
    router.push(
      `https://twitter.com/intent/tweet?text=${sendText}&url=${sendUrl}/?type=search&value=${wordName}`,
    );
  };
  const ShareFacebook = () => {
    // 페이스북 공유하기 페이지 이동
    router.push(
      `https://www.facebook.com/sharer/sharer.php?u=${sendUrl}/?type=search&value=${wordName}`,
    );
  };

  return (
    <div className={styles.buttonWrapper}>
      <RiTwitterXFill onClick={ShareTwitter} className={styles.button} />
      <RiFacebookFill onClick={ShareFacebook} className={styles.button} />
    </div>
  );
}
