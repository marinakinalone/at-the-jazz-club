import Image from 'next/image'
import React from 'react'
import styles from './RightSequence.module.css'
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

export const RightSequenceGame = ({ handleWin }: { handleWin: () => void }) => {
  return (
    <>
      <div className={styles.resultContainer}>
        <h1>Result</h1>
      </div>
      <div className={styles.buttonContainer}>
        {Array.from({ length: 10 }).map((_, index) => (
          <button key={index} className={styles.musicNoteButton}>
            <Image
              src={`/games/rightSequence/musicNote_${index}.png`}
              alt={`Button ${index}`}
              width={100}
              height={100}
            />
          </button>
        ))}
        <button onClick={handleWin}>click to unlock scene RightSequenceGame</button>
      </div>
    </>
  )
}

export default RightSequenceGame
