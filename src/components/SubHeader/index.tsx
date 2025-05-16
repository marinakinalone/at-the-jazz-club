import React from 'react'
import styles from './SubHeader.module.css'

const SubHeader = ({title}: {title: string}) => {
  return (
    <h1 className={styles.title}>{title}</h1>
  )
}

export default SubHeader