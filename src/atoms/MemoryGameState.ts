import { atom } from 'jotai'

// Schwartzian Transform
const shuffle = (arr: number[]) =>
  arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

const cards = [...Array(12).keys()]

const getCardDeck = () => {
  const deck = shuffle([...cards, ...cards, 12]).map((card, index) => {
    return {
      id: index,
      value: card,
      image: `/games/memory/card_${card}.png`,
      matched: false,
    }
  })
  return deck
}

export const cardsAtom = atom(getCardDeck())

export const flippedCardIdsAtom = atom<number[]>([])

export const winAtom = atom(false)

export const resetMemoryGameAtom = atom(null, (get, set) => {
  set(cardsAtom, getCardDeck())
  set(flippedCardIdsAtom, [])
  set(winAtom, false)
})

export const disableClick = atom<boolean>(false)

export const gameLogicAtom = atom(null, (get, set, flippedCardId: number) => {
  const cards = get(cardsAtom)
  const flippedCards = get(flippedCardIdsAtom)

  // prevent flipping the same card twice
  if (flippedCards.includes(flippedCardId)) return

  const updatedFlipped = [...flippedCards, flippedCardId]
  set(flippedCardIdsAtom, updatedFlipped)

  // if all matched except the winning card, update winning state
  const allMatchedExceptWinningCard = cards.every(
    (card) => card.matched || card.value === 12, // 12 is the WINNING_CARD
  )
  if (allMatchedExceptWinningCard) {
    set(winAtom, true)
  }

  if (updatedFlipped.length === 2) {
    set(disableClick, true)
    const [firstCard, secondCard] = updatedFlipped

    const firstCardValue = cards.find((card) => card.id === firstCard)?.value
    const secondCardValue = cards.find((card) => card.id === secondCard)?.value

    if (firstCardValue === secondCardValue) {
      setTimeout(() => {
        set(
          cardsAtom,
          cards.map((card) =>
            card.id === firstCard || card.id === secondCard ? { ...card, matched: true } : card,
          ),
        )

        set(flippedCardIdsAtom, [])
        set(disableClick, false)
      }, 1000)
    } else {
      setTimeout(() => {
        set(flippedCardIdsAtom, [])
        set(disableClick, false)
      }, 1000)
    }
  }
})
