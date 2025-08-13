import React from 'react'
import styles from './PrimaryButton.module.css'
import { ibmPlexMono } from '@/utils/fonts'

const PrimaryButton = ({
  label,
  handleClick = () => {},
  customStyles = {},
}: {
  label: string
  handleClick: () => void
  customStyles?: React.CSSProperties
}) => {
  return (
    <button
      className={`${styles.primaryButton} ${ibmPlexMono.className}`}
      onClick={handleClick}
      style={customStyles}
    >
      {label}
    </button>
  )
}

export default PrimaryButton
