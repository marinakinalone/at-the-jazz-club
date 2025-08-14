import { motion } from 'framer-motion'
import { useAtom, useSetAtom } from 'jotai'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useReward } from 'react-rewards'
import styles from './Memory.module.css'
import {
  cardsAtom,
  disableClick,
  flippedCardIdsAtom,
  gameLogicAtom,
  resetMemoryGameAtom,
  winAtom,
} from '@/atoms/MemoryGameState'
import jazzColors from '@/data/jazzColors'
import useSoundStore from '@/stores/soundStore'
import { sleep } from '@/utils/sleep'

interface ICard {
  id: number
  value: number
  image: string
  matched: boolean
}

// 25 cards, 5 x 5 grid. 12 + 1 winning card
const MemoryGame = ({ handleWin }: { handleWin: () => void }) => {
  const [playedSound, setPlayedSound] = useState<false | string>(false)

  const [cards] = useAtom(cardsAtom)
  const [flippedCards] = useAtom(flippedCardIdsAtom)
  const [, flipCard] = useAtom(gameLogicAtom)
  const [hasWon] = useAtom(winAtom)
  const resetMemoryGame = useSetAtom(resetMemoryGameAtom)
  const [disabled] = useAtom(disableClick)

  const isSilent = useSoundStore((state) => state.isSilent)
  const playSound = useSoundStore((state) => state.playSound)
  const stopSound = useSoundStore((state) => state.stopSound)

  useEffect(() => {
    // Reset when component unmounts
    return () => {
      resetMemoryGame()
    }
  }, [resetMemoryGame])

  const handleSelectCard = (card: ICard) => {
    if (playedSound) {
      stopSound(playedSound)
    }
    flipCard(card.id)
    const soundIndex = card.value + 1
    setPlayedSound(`memory_${soundIndex}`)
    playSound(`memory_${soundIndex}`)
  }

  const { reward } = useReward('rewardId', 'confetti', {
    decay: 0.98,
    elementCount: 500,
    startVelocity: 30,
    colors: jazzColors,
  })

  useEffect(() => {
    const startWinSequence = async () => {
      reward()
      await sleep(4000)
      handleWin()
    }
    if (hasWon) {
      startWinSequence()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasWon])

  return (
    <>
      <div className={styles.cardGrid}>
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(card.id)

          return card.matched ? (
            <div key={card.id} className={styles.emptyCardContainer}></div>
          ) : (
            <motion.button
              key={index}
              onClick={() => handleSelectCard(card)}
              className={styles.card}
              disabled={disabled}
              style={{
                cursor: disabled ? 'wait' : 'pointer',
                perspective: '1000px',
              }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'relative',
                  width: '88px',
                  height: '115px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Front side */}
                <div
                  style={{
                    position: 'absolute',
                    backfaceVisibility: 'hidden',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Image
                    src={`/games/memory/card_recto.png`}
                    alt="Card back"
                    width={88}
                    height={115}
                  />
                </div>

                {/* Back side */}
                <div
                  style={{
                    position: 'absolute',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Image
                    src={
                      isSilent
                        ? `/games/memory/card_verso_${card.value}.png`
                        : `/games/memory/card_verso_12.png`
                    }
                    alt="Card front"
                    width={88}
                    height={115}
                  />
                </div>
              </motion.div>
              {/* {card.value} */}
            </motion.button>
          )
        })}
      </div>
      <div className={styles.rewardContainer} id="rewardId" />
    </>
  )
}

export default MemoryGame
