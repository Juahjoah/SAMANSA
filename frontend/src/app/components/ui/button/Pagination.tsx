// 'use client'

import { useState } from 'react'
import styles from './Pagination.module.css'
// import { useRouter } from 'next/router'

const Pagination = () => {
  const [length, setLength] = useState(3)
  const [selectedButton, setSelectedButton] = useState(0)
  // const router = useRouter()

  const checkButton = (index: number) => {
    setSelectedButton(index)
    // router.push(`page${index}`)  // 클릭한 페이지넘버로 이동
  }
  const PageElements = Array.from({ length }, (_, index) => (
    <div
      key={index}
      className={`${styles.button} ${
        selectedButton === index ? styles.selectedButton : ''
      }`}
      onClick={() => checkButton(index)}
    >
      {index + 1}
    </div>
  ))
  return (
    <div>
      <div>네비게이션</div>
      <div className={styles.container}> {PageElements}</div>
    </div>
  )
}

export default Pagination
