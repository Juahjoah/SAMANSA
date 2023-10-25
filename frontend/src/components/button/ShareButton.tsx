'use client';

import styles from './ShareButton.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
//트위터, 페이스북 공유하기 버튼
export default function ShareButton() {
  const router = useRouter();
  const sendText = '밈셔너리'; // 전달할 텍스트
  const sendUrl = 'devpad.tistory.com/'; // 전달할 URL (임시)
  const [isTwitterHovered, setIsTwitteHovered] = useState(false); // 트위터 hover 감지변수
  const [isFacebookHovered, setIsFacebookHovered] = useState(false); // 페이스북 hover 감지변수
  // const sendUrl = window.location.href;

  const ShareTwitter = () => {
    // 트위터 공유하기 페이지 이동
    router.push(
      `https://twitter.com/intent/tweet?text=${sendText}&url=${sendUrl}`,
    );
  };
  const ShareFacebook = () => {
    // 페이스북 공유하기 페이지 이동
    router.push(`https://www.facebook.com/sharer/sharer.php?u=${sendUrl}`);
  };

  return (
    <div>
      <Image
        className={styles.twitter}
        src={
          isTwitterHovered
            ? '/assets/twitterIcon-hover.svg'
            : '/assets/twitterIcon.svg'
        }
        height={50}
        width={50}
        alt="트위터"
        onClick={ShareTwitter}
        onMouseEnter={() => {
          setIsTwitteHovered(true);
        }}
        onMouseLeave={() => {
          setIsTwitteHovered(false);
        }}
      />
      <Image
        className={styles.facebook}
        src={
          isFacebookHovered
            ? '/assets/facebookIcon-hover.svg'
            : '/assets/facebookIcon.svg'
        }
        height={50}
        width={50}
        alt="페이스북"
        onClick={ShareFacebook}
        onMouseEnter={() => {
          setIsFacebookHovered(true);
        }}
        onMouseLeave={() => {
          setIsFacebookHovered(false);
        }}
      />
    </div>
  );
}
