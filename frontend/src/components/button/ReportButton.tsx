'use client';

import styles from './ReportButton.module.css';

//신고하기 버튼
export default function ReportButton() {
  const CheckReport = () => {
    console.log('신고되었습니다.');
  };
  return (
    <div className={styles.reportButton} onClick={CheckReport}>
      신고하기
    </div>
  );
}
