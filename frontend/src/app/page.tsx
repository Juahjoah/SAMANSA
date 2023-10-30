import styles from './page.module.css';
import Header from '@/components/header';

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      main페이지
    </main>
  );
}
