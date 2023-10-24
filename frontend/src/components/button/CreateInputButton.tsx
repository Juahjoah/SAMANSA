'use client';
import { ChangeEvent } from 'react';
import styles from './CreateInputButton.module.css';

// 테스트용 단어생성 인풋
export default function CreateInputButton({
  width,
  height,
  setData,
  text,
  type,
}: {
  width: number;
  height: number;
  setData: any;
  text: string;
  type: string;
}) {
  const onInput1 = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  };
  const onInput2 = (e: ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };
  return (
    <div>
      {type === 'text' ? (
        <textarea
          className={styles.inputButton}
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          placeholder={text}
          onChange={onInput1}
        ></textarea>
      ) : (
        <input
          className={styles.inputButton}
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          placeholder={text}
          onChange={onInput2}
        ></input>
      )}
    </div>
  );
}
