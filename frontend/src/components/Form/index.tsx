import styles from './Form.module.css';
import Image from 'next/image';

export default function Form() {
  const rand = Math.floor(Math.random() * 17) + 1;
  const path = 'assets/form/' + String(rand).padStart(3, '0') + '.png';
  // console.log(rand);
  return (
    <a
      className={styles.form}
      href="https://forms.gle/G3rjuTbyuGvdQaCP6"
      target="_blank"
    >
      <Image src={path} alt="My Image" width={160} height={480} />
    </a>
  );
}
