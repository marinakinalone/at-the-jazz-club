import React from 'react'
import styles from './SecondaryButton.module.css'
import { ibmPlexMono } from '@/app/layout'

const SecondaryButton = ({
  label,
  handleClick = () => {},
}: {
  label: string
  handleClick: () => void
}) => {
  return (
    <button className={`${styles.secondaryButton} ${ibmPlexMono.className}`} onClick={handleClick}>
      {label}
    </button>
  )
}

export default SecondaryButton
