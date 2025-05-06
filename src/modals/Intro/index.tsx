// TODO when clicked on the button, it should save in cookies that the user has seen the intro
import React from 'react'
import useStore from '@/store'

const Intro = () => {
  const hasEnteredTheClub = useStore((state) => state.setHasEnteredTheClub)
  const handleClick = () => {
    hasEnteredTheClub()
  }
  return (
    <div>
      <h1>Le Club de Jazz</h1>
      <button onClick={handleClick}>entrer</button>
    </div>
  )
}

export default Intro
