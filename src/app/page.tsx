'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import Footer from '@/components/Footer'
import Scene from '@/components/Scene'
import { CURRENT_SCENE, IS_IN_THE_CLUB } from '@/constants/scenes'
import scenes from '@/data/scenes'
import Game from '@/games'
import IntroModal from '@/modals/Intro'
import ReplayGameModal from '@/modals/ReplayGame'
import RestartAdventureModal from '@/modals/RestartAdventure'
import useMainStore from '@/stores/mainStore'
import useModalStore from '@/stores/modalStore'
import { GAMES } from '@/types/games'
import { SceneName } from '@/types/scenes'

export default function Home() {
  const [isHydrated, setIsHydrated] = useState(false)

  const hasEnteredTheClub = useMainStore((state) => state.isInTheClub)
  const setHasEnteredTheClub = useMainStore((state) => state.setHasEnteredTheClub)
  const currentGame = useMainStore((state) => state.currentGame)
  const setCurrentScene = useMainStore((state) => state.setCurrentScene)
  const setPlayedGames = useMainStore((state) => state.setPlayedGames)

  const restartAdventureModalVisible = useModalStore(
    (state) => state.restartAdventureModal.isVisible,
  )
  const replayGameModalVisible = useModalStore((state) => state.replayGameModal.isVisible)

  useEffect(() => {
    const isInTheClub = localStorage.getItem(IS_IN_THE_CLUB) === 'true'
    const currentScene = localStorage.getItem(CURRENT_SCENE) as SceneName
    const memoryGameState = localStorage.getItem(GAMES.MEMORY)
    const rightSequenceGameState = localStorage.getItem(GAMES.RIGHT_SEQUENCE)

    setCurrentScene(currentScene || scenes[0].name)
    setHasEnteredTheClub(isInTheClub)
    setPlayedGames(GAMES.MEMORY, memoryGameState === 'true')
    setPlayedGames(GAMES.RIGHT_SEQUENCE, rightSequenceGameState === 'true')

    /* Ensure the hydrated state is set to true after checking localStorage.
    This prevents rendering the component before client-side data is available,
    avoiding potential mismatches between server-rendered and client-rendered HTML. */
    setIsHydrated(true)
  }, [setHasEnteredTheClub, setCurrentScene, setPlayedGames])

  if (!isHydrated) {
    return null
  }

  return (
    <main className={styles.main}>
      {currentGame && <Game gameName={currentGame} />}
      {hasEnteredTheClub ? <Scene /> : <IntroModal />}
      {restartAdventureModalVisible && <RestartAdventureModal />}
      {replayGameModalVisible && <ReplayGameModal />}
      <Footer />
    </main>
  )
}
