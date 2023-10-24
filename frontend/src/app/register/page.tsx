'use client';
import CreateButton from '@/components/button/CreateButton';
import CreateInputButton from '@/components/button/CreateInputButton';
import { useState } from 'react';

const CreatePage = () => {
  const [word, setWord] = useState(''); // 등록할 단어
  const [meaning, setMeaning] = useState(''); // 단어의 뜻
  const [example, setExample] = useState(''); // 예시 문장
  const [hashTag, setHashTag] = useState(''); // 해시 태그
  return (
    <div>
      <div>밈 등록 페이지</div>
      <br />
      <div>등록하고 싶은 단어</div>
      <CreateInputButton
        width={800}
        height={50}
        setData={setWord}
        text="단어를 입력하세요."
        type="input"
      ></CreateInputButton>
      <div>단어의 뜻</div>
      <CreateInputButton
        width={800}
        height={150}
        setData={setMeaning}
        text="단어의 뜻을 설명해주세요."
        type="text"
      ></CreateInputButton>
      <div>예시 문장</div>
      <CreateInputButton
        width={800}
        height={100}
        setData={setExample}
        text="예시를 들어주세요."
        type="text"
      ></CreateInputButton>
      <div>해시 태그</div>
      <CreateInputButton
        width={800}
        height={50}
        setData={setHashTag}
        text="관련된 태그를 등록해보세요!"
        type="input"
      ></CreateInputButton>
      <CreateButton
        word={word}
        meaning={meaning}
        example={example}
        hashTag={hashTag}
      ></CreateButton>
      단어: {word}, 단어의뜻: {meaning}, 예시문장: {example}, 해시태그:{' '}
      {hashTag}
    </div>
  );
};

export default CreatePage;
