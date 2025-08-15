import React, { useEffect, useState } from 'react'

const Caption = ({ message, interval = 25 }: { message: string; interval?: number }) => {
  const [currentPosition, setCurrentPosition] = useState(0)
  const items = message.split('')

  useEffect(() => {
    setCurrentPosition(0)
  }, [message])

  useEffect(() => {
    if (currentPosition >= items.length) return

    const intervalId = setInterval(() => {
      setCurrentPosition((prevPosition) => prevPosition + 1)
    }, interval)

    return () => {
      clearInterval(intervalId)
    }
  }, [currentPosition, interval, items])

  const animatedMessage = items.slice(0, currentPosition).join('')

  return (
    <>
      <p>{animatedMessage}</p>
    </>
  )
}

export default Caption
