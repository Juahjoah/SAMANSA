// 'use client'

import styles from './ShareButton.module.css'
import Image from 'next/image'
const ShareButton = () => {
  const ShareTwitter = () => {
    console.log('트위터 공유')
  }
  const ShareFacebook = () => {
    console.log('페이스북 공유')
  }
  return (
    <div className={styles.reportButton}>
      <Image
        src="/public/assets/icons/twitterIcon.png"
        height={200}
        width={300}
        alt="트위터"
        onClick={ShareTwitter}
      />
      <Image
        src="/public/assets/icons/facebookIcon.png"
        height={200}
        width={300}
        alt="페이스북"
        onClick={ShareFacebook}
      />
    </div>
  )
}

export default ShareButton
