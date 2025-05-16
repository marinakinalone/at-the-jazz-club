'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import Footer from '@/components/Footer'
import Scene from '@/components/Scene'
import { IS_IN_THE_CLUB } from '@/constants/scenes'
import Game from '@/games'
import CreditsModal from '@/modals/Credits'
import IntroModal from '@/modals/Intro'
import ReplayGameModal from '@/modals/ReplayGame'
import RestartAdventureModal from '@/modals/RestartAdventure'
import WinningModal from '@/modals/Winning'
import useMainStore from '@/stores/mainStore'
import useModalStore from '@/stores/modalStore'

export default function Home() {
  const [isHydrated, setIsHydrated] = useState(false)

  const hasEnteredTheClub = useMainStore((state) => state.isInTheClub)
  const setHasEnteredTheClub = useMainStore((state) => state.setHasEnteredTheClub)
  const playGame = useMainStore((state) => state.playGame)

  const restartAdventureModalVisible = useModalStore(
    (state) => state.restartAdventureModal.isVisible,
  )

  useEffect(() => {
    const isInTheClub = localStorage.getItem(IS_IN_THE_CLUB) === 'true'
    setHasEnteredTheClub(isInTheClub)

    /* Ensure the hydrated state is set to true after checking localStorage.
    This prevents rendering the component before client-side data is available,
    avoiding potential mismatches between server-rendered and client-rendered HTML. */
    setIsHydrated(true)
  }, [setHasEnteredTheClub])

  if (!isHydrated) {
    return null
  }

  return (
    <main className={styles.main}>
      {playGame && <Game gameName={playGame} />}
      {hasEnteredTheClub ? <Scene /> : <IntroModal />}
      {restartAdventureModalVisible && <RestartAdventureModal />}
      <Footer />
    </main>
  )
}
