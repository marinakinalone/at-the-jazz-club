import React from 'react'
import styles from './Message.module.css'

const Message = ({ content }: { content: string }) => {
  return <p className={styles.message}>{content}</p>
}

export default Message
