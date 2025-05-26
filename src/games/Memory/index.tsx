import { useAtom, useSetAtom } from 'jotai'
import Image from 'next/image'
import React, {useEffect} from 'react'
import { cardsAtom, flippedCardIdsAtom, gameLogicAtom, resetMemoryGameAtom, winAtom } from '@/atoms/MemoryGameState'

export const WINNING_CARD = 13

interface ICard {
  id: number
  value: number
  image: string
  matched: boolean
}

// 25 cards, 5 x 5 grid. 12 + 1 winning card
export const MemoryGame = ({ handleWin }: { handleWin: () => void }) => {
  const [cards] = useAtom(cardsAtom)
  const [flippedCards] = useAtom(flippedCardIdsAtom)
  const [, flipCard] = useAtom(gameLogicAtom)
  const [hasWon] = useAtom(winAtom)
  const resetMemoryGame = useSetAtom(resetMemoryGameAtom)

  useEffect(() => {
    // Reset when component unmounts
    return () => {
      resetMemoryGame()
    }
  }, [resetMemoryGame])


  const handleSelectCard = (card: ICard) => {
    flipCard(card.id)
  }

  useEffect(() => {
  if (hasWon) {
    handleWin()
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [hasWon])

  return (
    <>
      <div>
        {cards.map((card, index) => (
          card.matched ? (<p key={card.id}></p>) : (
          <button
            key={index}
            onClick={() => handleSelectCard(card)}
          >
            <Image
              src={
                flippedCards.includes(card.id)
                  ? `/games/memory/card_verso_${card.value}.png`
                  : `/games/memory/card_recto.png`
              }
              alt="Memory"
              width={95}
              height={125}
            />
            {card.value} {card.matched.toString()}
          </button>)
        ))}
      </div>
      <button onClick={handleWin}>click to unlock scene for MemoryGame</button>
    </>
  )
}

export default MemoryGame
