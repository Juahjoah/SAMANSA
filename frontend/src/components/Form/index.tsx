import styles from './Form.module.css';
import Image from 'next/image';
import form1 from '@/public/assets/form/001.png';
import form2 from '@/public/assets/form/002.png';
import form3 from '@/public/assets/form/003.png';
import form4 from '@/public/assets/form/004.png';
import form5 from '@/public/assets/form/005.png';
import form6 from '@/public/assets/form/006.png';

const images = [form1, form2, form3, form4, form5, form6];

export default function Form() {
  const rand = Math.floor(Math.random() * images.length); // 랜덤 인덱스 선택
  const selectedImage = images[rand]; // 랜덤 이미지 선택
  return (
    <a
      className={styles.form}
      href="https://forms.gle/G3rjuTbyuGvdQaCP6"
      target="_blank"
    >
      <Image src={selectedImage} priority={true} alt="My Image" width={160} height={480} />
    </a>
  );
}
