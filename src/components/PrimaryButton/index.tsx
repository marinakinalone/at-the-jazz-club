import React from 'react'

const PrimaryButton = ({
  label,
  handleClick = () => {},
  styles = {},
}: {
  label: string
  handleClick: () => void
  styles?: React.CSSProperties
}) => {
  return (
    <button onClick={handleClick} style={styles}>
      {label}
    </button>
  )
}

export default PrimaryButton
