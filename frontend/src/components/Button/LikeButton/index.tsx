'use client';

import styles from './LikeButton.module.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LikeButton() {
  //좋아요 싫어요 숫자 가져오기
  const [likeUser, setLikeUser] = useState(0);
  const [dislikeUser, setDisLikeUser] = useState(0);

  // api 요청할때 필요한 데이터 - true, false만 구분
  const [wordLikeState, setWordLikeState] = useState(false);
  const wordData = { wordLike: wordLikeState, wordId: '0w7ig4sBy0zyIcemUS-h' }; // 받아올 임시 데이터

  // api 받은 데이터 - '좋아요', '싫어요', ''
  const getState: string = '';
  const [islikeState, setIslikeState] = useState('');
  const [dislikeState, setDislikeState] = useState('');
  // 내가이미 좋아요를 눌렀는지, 싫어요를 눌렀는지 , 좋아요 유저수, 싫어요 유저수

  const BASE_URL = 'https://samansa.kr/api/word/like';

  // 좋아요 요청함수
  const likeRequest = () => {
    fetch(BASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        //   Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(wordData),
    })
      .then((response) => {
        console.log(response, '좋아요 성공', wordLikeState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 좋아요 판별함수
  const checkLikes = (isLiked: boolean) => {
    if (isLiked === true) {
      setWordLikeState(true);
      if (dislikeState === '싫어요') {
        // 싫어요=>좋아요 누른경우
        setLikeUser(likeUser + 1);
        setDisLikeUser(dislikeUser - 1);
        setIslikeState('좋아요');
        setDislikeState('');
        likeRequest();
      } else if (islikeState === '') {
        // 체크x 좋아요 누른 경우
        setLikeUser(likeUser + 1);
        setIslikeState('좋아요');
        likeRequest();
      }
    } else {
      setWordLikeState(false);
      if (islikeState === '좋아요') {
        // 좋아요=>싫어요 누른경우
        setDisLikeUser(dislikeUser + 1);
        setLikeUser(likeUser - 1);
        setIslikeState('');
        setDislikeState('싫어요');
        likeRequest();
      } else if (dislikeState === '') {
        // 체크x 싫어요 누른 경우
        setDisLikeUser(dislikeUser + 1);
        setDislikeState('싫어요');
        likeRequest();
      }
    }
  };

  useEffect(() => {
    setLikeUser(0);
    setDisLikeUser(0);
    if (getState === '좋아요') {
      setIslikeState(getState);
    } else if (getState === '싫어요') {
      setDislikeState(getState);
    }
  }, []);

  return (
    <div className={styles.base}>
      <div onClick={() => checkLikes(true)}>
        <Image
          src={
            islikeState === '' ? '/assets/islike.png' : '/assets/isliked.png'
          }
          height={30}
          width={30}
          alt="좋아요"
        />
        <div className={styles.tag}>좋아요 {likeUser}</div>
      </div>
      <div onClick={() => checkLikes(false)}>
        <Image
          src={
            dislikeState === '' ? '/assets/dislike.png' : '/assets/disliked.png'
          }
          height={30}
          width={30}
          alt="싫어요"
        />
        <div className={styles.tag}>싫어요 {dislikeUser}</div>
      </div>
    </div>
  );
}
