import React from 'react'

const Caption = ({ message }: { message: string }) => {
  // TODO add typing animation - see le journal
  return (
    <div>
      <p>{message}</p>
    </div>
  )
}

export default Caption
