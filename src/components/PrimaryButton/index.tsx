import React from 'react'

const PrimaryButton = ({
  label,
  handleClick = () => {},
}: {
  label: string
  handleClick: () => void
}) => {
  return <button onClick={handleClick}>{label}</button>
}

export default PrimaryButton
