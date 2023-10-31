'use client';

import { useEffect, useState } from 'react';
import styles from './Input.module.css';

interface InputProps {
  setValue: (e: any) => void | any;
  placeholder?: string;
  variant?: string;
  name?: string;
  value: string;
}

interface AutocompleteProps {
  setValue: (e: any) => void;
  setAutocomplete: (e: any) => void;
  selected?: boolean;
  text?: string;
}

export function Autocomplete({
  setValue,
  setAutocomplete,
  selected = false,
  text = '',
}: AutocompleteProps) {
  let variantClass;
  if (selected) {
    variantClass = styles.active;
  } else {
    variantClass = styles.deactive;
  }

  function clicked() {
    setValue(text);
    setAutocomplete(false);
  }
  return (
    <div className={styles.wrapper}>
      <input
        className={`${styles.base} ${styles.autocomplete} ${variantClass}`}
        onClick={clicked}
        value={text}
        readOnly
      />
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

export default function Input({
  setValue,
  variant = 'search',
  name = '',
  value = '',
}: InputProps) {
  //useState
  const [index, setIndex] = useState(0); //0:value 1~length:data
  const [InputValue, setInputValue] = useState(value);
  const [autocomplete, setAutocomplete] = useState(false);
  const [data, setData] = useState(['apple', 'banana', 'orange', 'kiwi']);

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
      placeholder = '단어 #태그 @사용자 를 검색하세요';
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
        setInputValue(data[0]);
        setIndex(1);
      } else if (d == -1) {
        setInputValue(data[data.length - 1]);
        setIndex(data.length);
      }
      setInputValue(data[index - 1]);
      return;
    }
    //결과로 value
    else if (d + index > data.length || d + index < 1) {
      setInputValue(value);
      setIndex(0);
      return;
    }
    //결과로 autoComplete list 중
    else {
      setIndex(index + d);
      setInputValue(data[index - 1]);
    }
  }

  function InputChange(e: any) {
    if (variant != 'search') {
      setValue(e.target.value);
      setData(data);
    } else {
      setAutocomplete(true); // toDo =>
      setValue(e.target.value);
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
        // setValue(index == 0 ? value : InputValue);
        const url = `${process.env.NEXT_PUBLIC_REDIRECT_URI}?search=${
          index == 0 ? value : InputValue
        }`;
        window.location.href = url;
        setIndex(0);
        setAutocomplete(false);
        break;
      default:
        return; // 키 이벤트를 처리하지 않는다면 종료합니다.
    }
  }

  useEffect(() => {
    if (index == 0) {
      setInputValue(value);
    } else {
      setInputValue(data[index - 1]);
    }
  }, [index]);

  useEffect(() => {
    // console.log('value: useEffec');
    if (value != '') {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/word/auto-complete?word=${value}`,
        {
          method: 'GET',
        },
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log('사용자 정보 요청 성공:', userData);
          // console.log(data.words);
          setData(data.words);
        })
        .catch(() => {
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
      />

      {autocomplete && (
        <div>
          {data.map((text, i) => (
            <Autocomplete
              setValue={setValue}
              setAutocomplete={setAutocomplete}
              selected={index == i + 1}
              text={text}
              key={i}
            />
          ))}{' '}
          <AutocompleteEnd />
        </div>
      )}
    </div>
  );
}
