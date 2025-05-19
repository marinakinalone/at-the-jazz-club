import React, {useEffect, useState} from 'react'

const Caption = ({ message }: { message: string }) => {
  const [currentPosition, setCurrentPosition] = useState(0)
  const items = message.split('')

  useEffect(() => {
    setCurrentPosition(0)
  }, [message])

  useEffect(() => {
    if (currentPosition >= items.length) return

    const intervalId = setInterval(() => {
      setCurrentPosition((prevPosition) => prevPosition + 1)
    }, 25)

    return () => {
      clearInterval(intervalId)
    }
  }, [currentPosition, items])

  const animatedMessage = items.slice(0, currentPosition).join('')

  return (
    <div>
      <p>{animatedMessage}</p>
    </div>
  )
}

export default Caption
