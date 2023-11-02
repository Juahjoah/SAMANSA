import styles from './Form.module.css';
import Image from 'next/image';

export default function Form() {
  // console.log(rand);
  return (
    <a
      className={styles.form}
      href="https://forms.gle/G3rjuTbyuGvdQaCP6"
      target="_blank"
    >
      <Image
        src={'assets/form/001.png'}
        alt="toServay"
        width={160}
        height={480}
        loading="lazy"
        // priority={false}
      />
    </a>
  );
}

// 'use client';
// import styles from './Form.module.css';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';

// export default function Form() {
//   const [path, setPath] = useState('');

//   useEffect(() => {
//     const rand = String(Math.floor(Math.random() * 17) + 1).padStart(3, '0');
//     setPath('assets/form/' + rand + '.png');
//   }, []);
//   // console.log(rand);
//   return (
//     <a
//       className={styles.form}
//       href="https://forms.gle/G3rjuTbyuGvdQaCP6"
//       target="_blank"
//     >
//       {path && (
//         <Image
//           src={path}
//           alt="toServay"
//           width={160}
//           height={480}
//           loading="lazy"
//           // priority={false}
//         />
//       )}
//     </a>
//   );
// }
