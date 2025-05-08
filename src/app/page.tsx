'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import Scene from '@/components/Scene'
import { IS_IN_THE_CLUB } from '@/constants/scenes'
import Game from '@/games'
import Intro from '@/modals/Intro'
import useStore from '@/store'
import { GAMES } from '@/types/games'

const { RIGHT_SEQUENCE, MEMORY } = GAMES

export default function Home() {
  const [isHydrated, setIsHydrated] = useState(false)

  const hasEnteredTheClub = useStore((state) => state.isInTheClub)
  const setHasEnteredTheClub = useStore((state) => state.setHasEnteredTheClub)
  const playGame = useStore((state) => state.playGame)

  useEffect(() => {
    const isInTheClub = localStorage.getItem(IS_IN_THE_CLUB) === 'true'
    setHasEnteredTheClub(isInTheClub)
    // Ensure the hydrated state is set to true after checking localStorage.
    // This prevents rendering the component before client-side data is available,
    // avoiding potential mismatches between server-rendered and client-rendered HTML.
    setIsHydrated(true)
  }, [setHasEnteredTheClub])

  if (!isHydrated) {
    return null
  }

  return (
    <main className={styles.main}>
      {playGame === RIGHT_SEQUENCE && <Game gameName={RIGHT_SEQUENCE} />}
      {playGame === MEMORY && <Game gameName={MEMORY} />}
      {hasEnteredTheClub ? <Scene /> : <Intro />}
    </main>
  )
}
