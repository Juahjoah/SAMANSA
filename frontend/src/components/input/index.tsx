'use client';

import { useEffect, useState } from 'react';
import styles from './Input.module.css';

interface InputProps {
  setValue?: (e: any) => void | any;
  setEnter?: (e: any) => void;
  placeholder?: string;
  variant?: string;
  name?: string;
  value?: string;
}

interface AutocompleteProps {
  setValue: (e: any) => void;
  setAutocomplete: (e: any) => void;
  value?: string;
  text?: string;
}

export default function Input({
  setValue,
  setEnter,
  // placeholder = '',
  variant = 'search',
  name = '',
  value = '',
}: InputProps) {
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

  //enter 누를 때 검색바라면 검색하게
  function activeEnter(e: any) {
    if (variant != 'search') {
      return;
    }
    switch (
      e.key //toDo =>
    ) {
      // case 'Down': // IE/Edge에서 사용되는 값
      // case 'ArrowDown':
      //   // "아래 화살표" 키가 눌렸을 때의 동작입니다.
      //   autoComplete(1);
      //   // setValue('아래 화살표');
      //   break;
      // case 'Up': // IE/Edge에서 사용되는 값
      // case 'ArrowUp':
      //   // "위 화살표" 키가 눌렸을 때의 동작입니다.
      //   autoComplete(-1);
      //   // setValue('위 화살표');
      //   break;
      case 'Enter':
        // "enter" 또는 "return" 키가 눌렸을 때의 동작입니다.
        setValue(index == 0 ? value : InputValue);
        setIndex(0);
        setEnter(true);
        setAutocomplete(false);
        break;
      default:
        return; // 키 이벤트를 처리하지 않는다면 종료합니다.
    }
  }

  const [index, setIndex] = useState(0); //0:value 1~length:data
  const [InputValue, setInputValue] = useState(value);
  const [autocomplete, setAutocomplete] = useState(false);
  const [data, setData] = useState(['apple', 'banana', 'orange', 'kiwi']);

  function autoComplete(d: number) {
    // console.log('index : ' + index + '   d : ' + d);
    //검색 완료의 경우
    if (!autocomplete) {
      // console.log('autocomplete : false');
      return;
    }
    //원래 InputValue == value 인 경우
    else if (index == 0) {
      // console.log('index : ' + index + '   d : ' + d);
      if (d == 1) {
        // setInputValue(data[0]);
        setIndex(1);
      } else if (d == -1) {
        // setInputValue(data[data.length - 1]);
        setIndex(data.length);
      }
      // setInputValue(data[index - 1]);
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
      //toDo : up/down 메소드
      setIndex(index + d);
      setInputValue(data[index - 1]);
    }
  }

  function InputChange(e: any) {
    console.log(e.target.value);
    if (variant != 'search') {
      setValue(e.target.value);
      setData(data);
    } else {
      // setAutocomplete(true); // toDo =>
      setValue(e.target.value);
      setIndex(0);
    }
  }

  useEffect(() => {
    if (index == 0) {
      setInputValue(value);
    } else {
      setInputValue(data[index - 1]);
    }
  }, [index]);

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
      {/* toDo =>
       {autocomplete && (
        <div>
          {data.map((text) => (
            <Autocomplete
              setValue={setValue}
              setAutocomplete={setAutocomplete}
              value={InputValue}
              text={text}
              key={text}
            />
          ))}{' '}
          <AutocompleteEnd />
        </div>
      )} */}
    </div>
  );
}

export function Autocomplete({
  setValue,
  setAutocomplete,
  value = '',
  text = '',
}: AutocompleteProps) {
  let variantClass;
  if (value == text) {
    variantClass = styles.active;
  } else {
    variantClass = styles.deactive;
  }

  function clicked() {
    // console.log(text);
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
