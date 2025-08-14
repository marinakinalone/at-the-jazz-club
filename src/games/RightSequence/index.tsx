import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useReward } from 'react-rewards'
import styles from './RightSequence.module.css'
import jazzColors from '@/data/jazzColors'
import useSoundStore from '@/stores/soundStore'
import { sleep } from '@/utils/sleep'

const winningSequence = [7, 4, 2, 4, 5, 8, 9, 8, 4, 1, 0, 1, 7, 4, 2, 4, 5, 8, 6, 4, 1, 0, 1, 3]

const RightSequenceGame = ({ handleWin }: { handleWin: () => void }) => {
  const [currentInput, setCurrentInput] = useState<number[]>([])
  const [allCorrect, setAllCorrect] = useState<boolean>(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const playSound = useSoundStore((state) => state.playSound)
  const stopSound = useSoundStore((state) => state.stopSound)

  const { reward } = useReward('rewardRightSequence', 'confetti', {
    lifetime: 22000,
    decay: 1,
    elementCount: 700,
    startVelocity: 5,
    colors: jazzColors,
  })

  // Cleanup function to abort any pending operations
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
  }, [])

  useEffect(() => {
    return cleanup // Cleanup on unmount
  }, [cleanup])

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

      abortControllerRef.current = new AbortController()
      const signal = abortControllerRef.current.signal

      try {
        reward()
        playSound('rightSequence_dreamer')
        setAllCorrect(true)

        await sleep(22000, signal)

        if (!signal.aborted) {
          handleWin()
        }
      } catch {
        stopSound('rightSequence_dreamer')
      }
      return
    }
    setCurrentInput((prev) => [...prev, index])
  }

  return (
    <>
      <div className={styles.resultContainer}>
        <AnimatePresence mode="popLayout">
          {currentInput.map((note, index) => {
            return (
              <div className={styles.result} key={`note-${index}-${note}`}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ y: -5, opacity: 0.75 }}
                  transition={{ ease: 'easeOut', duration: 0.8 }}
                >
                  <Image
                    src={`/games/rightSequence/musicNote_${note}.png`}
                    alt={`Button ${index}`}
                    width={50}
                    height={50}
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
      <div className={styles.rewardContainer} id="rewardRightSequence" />
      <motion.div
        className={styles.buttonContainer}
        initial={{ opacity: 1 }}
        animate={{ opacity: allCorrect ? 0 : 1, transition: { duration: 2, ease: 'easeIn' } }}
      >
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
      </motion.div>
    </>
  )
}

export default RightSequenceGame
