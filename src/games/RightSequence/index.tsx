import Image from 'next/image'
import React, { useState } from 'react'
import styles from './RightSequence.module.css'
import useSoundStore from '@/stores/soundStore'
/*
background: #101920;
#f4b301
#ff5100
#9e27b5
#fce5bd
#5a7aff
#bb009e
#00ce38
#d20125
#4dadab
#e49ae6
*/

/*
Winning sequence is 24 notes;
7, 4, 2, 4, 5, 8, 9, 8, 4, 1, 0, 1, 
7, 4, 2, 4, 5, 8, 6, 4, 1, 0, 1, 3 
*/

// TODO win animation, reset animation, sound, effect on press, result display, close button

const winningSequence = [7, 4, 2, 4, 5, 8, 9, 8, 4, 1, 0, 1, 7, 4, 2, 4, 5, 8, 6, 4, 1, 0, 1, 3]

export const RightSequenceGame = ({ handleWin }: { handleWin: () => void }) => {
  const [currentInput, setCurrentInput] = useState<number[]>([])

  const playSound = useSoundStore(state => state.playSound)

  const handleButtonClick = (index: number) => {
    if (index !== winningSequence[currentInput.length]) {
      setCurrentInput([])
      return
    }

    playSound(`rightSequence_note_${index}`)

    if (currentInput.length === winningSequence.length - 1) {
      setTimeout(
        () => playSound('rightSequence_dreamer'), 1000
      )

      setTimeout(
        () => handleWin(), 22_000
      )
      
      return
    }

    setCurrentInput((prev) => [...prev, index])
  }
  return (
    <>
      <div className={styles.resultContainer}>
        {currentInput.map((note, index) => {
          return (
            <div className={styles.result} key={index}>
              <Image
                src={`/games/rightSequence/musicNote_${note}.png`}
                alt={`Button ${index}`}
                width={55}
                height={55}
                style={{
                  marginTop: `-${note * 3}px`,
                  marginLeft: `${note}px`
                }}
              />
            </div>
          )
        })}
      </div>
      <div className={styles.buttonContainer}>
        {Array.from({ length: 10 }).map((_, index) => (
          <button
            key={index}
            className={styles.musicNoteButton}
            onClick={() => handleButtonClick(index)}
          >
            <Image
              src={`/games/rightSequence/musicNote_${index}.png`}
              alt={`Button ${index}`}
              width={100}
              height={100}
            />
            {/* <p>{index}</p> */}
          </button>
        ))}
        {/* <button onClick={handleWin}>click to unlock scene RightSequenceGame</button> */}
      </div>
    </>
  )
}

export default RightSequenceGame
