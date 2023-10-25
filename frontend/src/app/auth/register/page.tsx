'use client';
import CreateButton from '@/components/button/CreateButton';
// import CreateInputButton from '@/components/button/CreateInputButton';
import Input from '@/components/input/index';
import Textarea from '@/components/textarea/index';
import styles from './page.module.css';
import { useState } from 'react';

const CreatePage = () => {
  const [word, setWord] = useState(''); // 등록할 단어
  const [meaning, setMeaning] = useState(''); // 단어의 뜻
  const [example, setExample] = useState(''); // 예시 문장
  const [hashTag, setHashTag] = useState(''); // 해시 태그
  return (
    <div className={styles.components}>
      <div className={styles.regist}>
        <div>밈 등록 페이지</div>
        <br />
        <div>
          <div>등록하고 싶은 단어</div>
          <Input
            setValue={setWord}
            variant={'word'}
            name={'단어등록'}
            value={word}
          ></Input>
        </div>
        <div>단어의 뜻</div>
        <Textarea
          setValue={setMeaning}
          variant={'decs'}
          name={'단어의 뜻'}
          value={meaning}
        ></Textarea>
        <div>예시 문장</div>
        <Textarea
          setValue={setExample}
          variant={'example'}
          name={'예시문장'}
          value={example}
        ></Textarea>
        <div>해시 태그</div>
        <Input
          setValue={setHashTag}
          variant={'tag'}
          name={'헤시 태그'}
          value={hashTag}
        ></Input>
        <CreateButton
          word={word}
          meaning={meaning}
          example={example}
          hashTag={hashTag}
        ></CreateButton>
        단어: {word}, 단어의뜻: {meaning}, 예시문장: {example}, 해시태그:{' '}
        {hashTag}
      </div>
    </div>
  );
};

export default CreatePage;
