import styles from './page.module.css';
import Pagination from '@/components/button/Pagination';
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.topTag}>
        <div className={styles.icon}>x</div>
        <div>트렌딕셔너리</div>
      </div>
      <div className={styles.searchTag}>
        <div className={styles.searchInput}>검색버튼</div>
        <div className={styles.createWord}>+</div>
      </div>
      <div className={styles.bottomTag}>
        <div className={styles.cardList}>단어 리스트</div>
        <div className={styles.googleForm}>우측 카드</div>
      </div>

      <Pagination></Pagination>
    </main>
  );
}
