// 'use client'

import styles from './ReportButton.module.css'

const ReportButton = () => {
  const CheckReport = () => {
    console.log('신고되었습니다.')
  }
  return (
    <div className={styles.reportButton} onClick={CheckReport}>
      신고하기
    </div>
  )
}

export default ReportButton
