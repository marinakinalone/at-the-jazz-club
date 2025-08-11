import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './RightSequence.module.css'
import useSoundStore from '@/stores/soundStore'
import { sleep } from '@/utils/sleep'

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

// TODO win animation, reset animation, effect on press, result display, close button

const winningSequence = [7, 4, 2, 4, 5, 8, 9, 8, 4, 1, 0, 1, 7, 4, 2, 4, 5, 8, 6, 4, 1, 0, 1, 3]

export const RightSequenceGame = ({ handleWin }: { handleWin: () => void }) => {
  const [currentInput, setCurrentInput] = useState<number[]>([])

  const playSound = useSoundStore((state) => state.playSound)

  const handleButtonClick = async (index: number) => {
    // wrong input case
    if (index !== winningSequence[currentInput.length]) {
      setCurrentInput([])
      return
    }

    playSound(`rightSequence_note_${index}`)

    // win case
    if (currentInput.length === winningSequence.length - 1) {
      setCurrentInput((prev) => [...prev, index])
      await sleep(500)
      playSound('rightSequence_dreamer')
      await sleep(22000)
      handleWin()
      return
    }

    setCurrentInput((prev) => [...prev, index])
  }
  return (
    <>
      <div className={styles.resultContainer}>
        <AnimatePresence>
          {currentInput.map((note, index) => {
            return (
              <div className={styles.result} key={index}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ y: -5, opacity: 0.75 }}
                  transition={{ ease: 'easeOut', duration: 0.8 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2, ease: 'easeIn' } }}
                >
                  <Image
                    src={`/games/rightSequence/musicNote_${note}.png`}
                    alt={`Button ${index}`}
                    width={55}
                    height={55}
                    style={{
                      marginTop: `-${note * 3}px`,
                      marginLeft: `${note}px`,
                    }}
                  />
                </motion.div>
              </div>
            )
          })}
        </AnimatePresence>
      </div>
      <div className={styles.buttonContainer}>
        {Array.from({ length: 10 }).map((_, index) => (
          <motion.button
            key={index}
            className={styles.musicNoteButton}
            onClick={() => handleButtonClick(index)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <Image
              src={`/games/rightSequence/musicNote_${index}.png`}
              alt={`Button ${index}`}
              width={100}
              height={100}
            />
          </motion.button>
        ))}
        {/* <button onClick={handleWin}>click to unlock scene RightSequenceGame</button> */}
      </div>
    </>
  )
}

export default RightSequenceGame
