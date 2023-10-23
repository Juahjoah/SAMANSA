// 'use client'

import styles from './CreateInputButton.module.css'
import { useState } from 'react'

const CreateInputButton = () => {
  const [data, setData] = useState('')
  const onInput1 = (e) => {
    setData(e.target.value)
  }
  return (
    <div>
      <div>인풋</div>
      <input className={styles.inputButton} onChange={onInput1}></input>
    </div>
  )
}

export default CreateInputButton
