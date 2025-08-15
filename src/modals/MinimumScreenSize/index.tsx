import React from 'react'
import styles from './MinimumScreenSize.module.css'
import Message from '@/components/Message'
import SubHeader from '@/components/SubHeader'

const MinimumScreenSize = () => {
  return (
    <div className={styles.modalContainer}>
      <SubHeader title="format d'écran non pris en charge" />
      <Message content="Ouvrez Le Club de Jazz sur un écran plus grand (tablette ou ordinateur - 820 x 760)" />
    </div>
  )
}

export default MinimumScreenSize
