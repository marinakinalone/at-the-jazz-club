import { useAtom, useSetAtom } from 'jotai'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './Memory.module.css'
import {
  cardsAtom,
  disableClick,
  flippedCardIdsAtom,
  gameLogicAtom,
  resetMemoryGameAtom,
  winAtom,
} from '@/atoms/MemoryGameState'
import useSoundStore from '@/stores/soundStore'

export const WINNING_CARD = 12

interface ICard {
  id: number
  value: number
  image: string
  matched: boolean
}

// 25 cards, 5 x 5 grid. 12 + 1 winning card
export const MemoryGame = ({ handleWin }: { handleWin: () => void }) => {
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

  useEffect(() => {
    if (hasWon) {
      handleWin()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasWon])

  return (
    <>
      <div className={styles.cardGrid}>
        {cards.map((card, index) =>
          card.matched ? (
            <div key={card.id} className={styles.emptyCardContainer}></div>
          ) : (
            <button
              key={index}
              onClick={() => handleSelectCard(card)}
              className={styles.card}
              disabled={disabled}
              style={{
                cursor: disabled ? 'wait' : 'pointer',
              }}
            >
              <Image
                src={
                  flippedCards.includes(card.id)
                    ? isSilent
                      ? `/games/memory/card_verso_${card.value}.png`
                      : `/games/memory/card_verso_12.png`
                    : `/games/memory/card_recto.png`
                }
                alt="Memory"
                width={88}
                height={115}
              />
              {card.value}
            </button>
          ),
        )}
      </div>
      <button onClick={handleWin}>click to unlock scene for MemoryGame</button>
    </>
  )
}

export default MemoryGame
