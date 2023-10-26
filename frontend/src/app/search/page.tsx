'use client';

import styles from './page.module.css';

//test
import Input from '@/components/input';
import { useEffect, useState } from 'react';

export default function Search() {
  const [value, setValue] = useState('value');

  useEffect(() => {
    if (index == 0) {
      setInputValue(value);
    } else {
      setInputValue(data[index - 1]);
    }
  }, [value]);

  return (
    <div className={styles.main}>
      <div className={styles.topTag}>
        <div>40004</div>
      </div>
      <div>
        <Input value={value} setValue={setValue} />
      </div>
    </div>
  );
}
