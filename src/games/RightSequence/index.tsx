import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useReward } from 'react-rewards'
import styles from './RightSequence.module.css'
import Caption from '@/components/Caption'
import jazzColors from '@/data/jazzColors'
import useMainStore from '@/stores/mainStore'
import useSoundStore from '@/stores/soundStore'
import { sleep } from '@/utils/sleep'

const winningSequence = [7, 4, 2, 4, 5, 8, 9, 8, 4, 1, 0, 1]
const pianoKeys = [0, 1, 2, 4, 5, 7, 8, 9]

const RightSequenceGame = ({ handleWin }: { handleWin: () => void }) => {
  const [currentInput, setCurrentInput] = useState<number[]>([])
  const [allCorrect, setAllCorrect] = useState<boolean>(false)
  const [displayWinningMessage, setDisplayWinningMessage] = useState<boolean>(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const hasAlreadyPlayed = useMainStore((state) => state.playedGames.RIGHT_SEQUENCE)

  const playSound = useSoundStore((state) => state.playSound)
  const stopSound = useSoundStore((state) => state.stopSound)

  const winningMessage = hasAlreadyPlayed
    ? '✨ 🎺 🎷 ✨ '
    : "✨ 🎺 Tu vas pouvoir entrer dans le club de jazz. Une surprise t'attend à l'intérieur ! Sauras-tu résoudre la prochaine énigme ? 🎷 ✨"

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

  const handleButtonClick = async (key: number) => {
    // wrong input case
    if (key !== winningSequence[currentInput.length]) {
      setCurrentInput([])
      return
    }

    playSound(`rightSequence_note_${key}`)

    // win case
    if (currentInput.length === winningSequence.length - 1) {
      setCurrentInput((prev) => [...prev, key])
      await sleep(500)

      abortControllerRef.current = new AbortController()
      const signal = abortControllerRef.current.signal

      try {
        reward()
        playSound('rightSequence_dreamer')
        setAllCorrect(true)
        await sleep(2000, signal)
        setDisplayWinningMessage(true)

        await sleep(20000, signal)

        if (!signal.aborted) {
          handleWin()
          setDisplayWinningMessage(false)
        }
      } catch {
        stopSound('rightSequence_dreamer')
      }
      return
    }
    setCurrentInput((prev) => [...prev, key])
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
      {displayWinningMessage && (
        <div className={styles.winMessageContainer}>
          <h1>Félicitations !</h1>
          <Caption message={winningMessage} interval={75} />
        </div>
      )}
      <motion.div
        className={styles.buttonContainer}
        initial={{ opacity: 1 }}
        animate={{ opacity: allCorrect ? 0 : 1, transition: { duration: 2, ease: 'easeIn' } }}
      >
        {pianoKeys.map((key, index) => (
          <motion.button
            key={index}
            className={styles.musicNoteButton}
            onClick={() => handleButtonClick(key)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <Image
              src={`/games/rightSequence/musicNote_${key}.png`}
              alt={`Button ${index}`}
              width={100}
              height={100}
            />
          </motion.button>
        ))}
      </motion.div>
    </>
  )
}

export default RightSequenceGame
