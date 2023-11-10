'use client';

import styles from './ShareButton.module.css';

import { useRouter } from 'next/navigation';

import { RiTwitterXFill } from 'react-icons/ri';
import { RiFacebookFill } from 'react-icons/ri';

export default function ShareButton() {
  const router = useRouter();
  const sendText = '밈셔너리'; // 전달할 텍스트
  const sendUrl = 'devpad.tistory.com/'; // 전달할 URL (임시)

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
    // <div>
    //   <Image
    //     className={styles.twitter}
    //     src={'/assets/twitterIcon.svg'}
    //     width={25}
    //     height={25}
    //     alt="트위터"
    //     onClick={ShareTwitter}
    //   />
    //   <Image
    //     className={styles.facebook}
    //     src={'/assets/facebookIcon.svg'}
    //     height={25}
    //     width={25}
    //     alt="페이스북"
    //     onClick={ShareFacebook}
    //   />
    // </div>
    <div className={styles.buttonWrapper}>
      <RiTwitterXFill onClick={ShareTwitter} className={styles.button} />
      <RiFacebookFill onClick={ShareFacebook} className={styles.button} />
    </div>
  );
}
