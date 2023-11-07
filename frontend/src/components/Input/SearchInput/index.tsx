'use client';

import { useEffect, useState } from 'react';
import styles from './SearchInput.module.css';

type InputProps = {
  setValue?: (e: any) => void | any;
  placeholder?: string;
  variant?: string;
  name?: string;
  value?: string;
  isMain?: boolean;
};

type AutocompleteProps = {
  setAutocomplete: (e: any) => void;
  selected?: boolean;
  word: Word;
};

type Word = {
  name: string;
  description: string;
};

export function Autocomplete({
  setAutocomplete,
  selected = false,
  word = { name: '', description: '' },
}: AutocompleteProps) {
  let variantClass;
  if (selected) {
    variantClass = styles.active;
  } else {
    variantClass = styles.deactive;
  }

  function clicked() {
    setAutocomplete(false);

    const url = `${
      process.env.NEXT_PUBLIC_REDIRECT_URI
    }${`?type=search&value=${word.name}`}`;

    window.location.href = url;
  }
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.base} ${styles.autocomplete} ${variantClass}`}
        onClick={clicked}
      >
        {word.name}
        <span className={`${styles.description}`}>{word.description}</span>
      </div>
    </div>
  );
}

export function AutocompleteEnd() {
  return (
    <div className={styles.wrapper}>
      <input
        className={`${styles.base} ${styles.autocomplete} ${styles.end}`}
        value={''}
        readOnly
      />
    </div>
  );
}

export default function SearchInput({
  variant = 'search',
  name = '',
  value: ValueProps = '',
}: InputProps) {
  //useState
  const [index, setIndex] = useState(0); //0:value 1~length:data
  const [autocomplete, setAutocomplete] = useState(false);
  const [data, setData] = useState([{ name: '', description: '' }]);
  const [value, setValue] = useState(ValueProps);

  const [InputValue, setInputValue] = useState(ValueProps);

  //place holder 설정
  let variantClass = '';
  let placeholder = '';
  switch (variant) {
    case 'word':
      variantClass = styles.word;
      placeholder = '단어';
      break;
    case 'tag':
      variantClass = styles.tag;
      placeholder = '#태그';
      break;
    case 'search':
      variantClass = styles.search;
      placeholder = '단어를 검색하세요';
      break;
    case 'nickname':
      variantClass = styles.nickname;
      placeholder = '사용할 닉네임을 입력하세요.';
      break;
  }

  function autoComplete(d: number) {
    //검색 완료의 경우
    if (!autocomplete) {
      return;
    }
    //원래 InputValue == value 인 경우
    else if (index == 0) {
      if (d == 1) {
        setIndex(1);
      } else if (d == -1) {
        setIndex(data.length);
      }
      return;
    }
    //결과로 value
    else if (d + index > data.length || d + index < 1) {
      setIndex(0);
      return;
    }
    //결과로 autoComplete list 중
    else {
      setIndex(index + d);
    }
  }

  function InputChange(e: any) {
    setValue(e.target.value);
    if (variant == 'search') {
      setAutocomplete(true);
      setIndex(0);
    }
  }

  //enter 누를 때 검색바라면 검색하게
  function activeEnter(e: any) {
    if (variant != 'search') {
      return;
    }
    switch (e.key) {
      case 'Down': // IE/Edge에서 사용되는 값
      case 'ArrowDown':
        // "아래 화살표" 키가 눌렸을 때의 동작
        autoComplete(1);
        break;
      case 'Up': // IE/Edge에서 사용되는 값
      case 'ArrowUp':
        // "위 화살표" 키가 눌렸을 때의 동작
        autoComplete(-1);
        break;
      case 'Enter':
        // "enter" 또는 "return" 키가 눌렸을 때의 동작

        //지금 input 창의 값 가져옴
        const search = index == 0 ? value : InputValue;

        const url = `${process.env.NEXT_PUBLIC_REDIRECT_URI}${
          search == '' ? `` : `?type=search&value=${search}`
        }`;

        setIndex(0);
        setAutocomplete(false);

        window.location.href = url;
        break;
      default:
        return; // 키 이벤트를 처리하지 않는다면 종료합니다.
    }
  }

  useEffect(() => {
    if (index == 0) {
      setInputValue(value);
    } else {
      setInputValue(data[index - 1].name);
    }
  }, [index]);

  useEffect(() => {
    // console.log('value: useEffec');
    if (value != '' && variant == 'search') {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/word/auto-complete?word=${value}`,
        {
          method: 'GET',
        },
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.words.legth == 0) {
            setData([{ name: '', description: '' }]);
          } else {
            setData(data.words);
          }
        })
        .catch(() => {
          setData([{ name: '', description: '' }]);
          // console.error('사용자 정보 요청 실패:', error);
        });
    }
  }, [value]);

  return (
    <div className={styles.wrapper}>
      <input
        placeholder={placeholder}
        className={`${styles.base} ${variantClass} ${
          autocomplete ? styles.focus : null
        }`}
        onChange={(e) => InputChange(e)}
        onKeyDown={(e) => activeEnter(e)}
        name={name}
        value={index == 0 ? value : InputValue}
        autoFocus
      />

      {autocomplete && (
        <div>
          {data.map((word, i) => (
            <Autocomplete
              // setValue={setValue}
              setAutocomplete={setAutocomplete}
              selected={index == i + 1}
              word={word}
              key={i}
            />
          ))}{' '}
          <AutocompleteEnd />
        </div>
      )}
    </div>
  );
}
