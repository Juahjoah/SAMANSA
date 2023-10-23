// 'use client'

//밈 등록 페이지에 쓰이는 input이다.

import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from 'react';
import styles from './CreateInput.module.css';
import Image from 'next/image';
const ShareButton = (text: string) => {
  return (
    <div className={styles.input}>
      <input className={} id={} name={}>
        {text}
      </input>
    </div>
  );
};

export default ShareButton;
