// 'use client'

import styles from './ShareButton.module.css';
import Image from 'next/image';
const ShareButton = () => {
  const ShareTwitter = () => {
    console.log('트위터 공유');
  };
  const ShareFacebook = () => {
    console.log('페이스북 공유');
  };
  return (
    <div className={styles.reportButton}>
      <input></input>
    </div>
  );
};

export default ShareButton;
