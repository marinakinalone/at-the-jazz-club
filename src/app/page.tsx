'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import Footer from '@/components/Footer'
import Scene from '@/components/Scene'
import { CURRENT_SCENE, IS_IN_THE_CLUB } from '@/constants/scenes'
import scenes from '@/data/scenes'
import Game from '@/games'
import IntroModal from '@/modals/Intro'
import ReplayGameModal from '@/modals/ReplayGame'
import RestartAdventureModal from '@/modals/RestartAdventure'
import SoundPermissionModal from '@/modals/SoundPermission'
import useMainStore from '@/stores/mainStore'
import useModalStore from '@/stores/modalStore'
import { useSoundStore } from '@/stores/soundStore'
import { GAMES } from '@/types/games'
import { Modals } from '@/types/modals'
import { SceneName, SCENES } from '@/types/scenes'
import { fetchFirebaseSoundUrls } from '@/utils/firebase'

export default function Home() {
  const [isHydrated, setIsHydrated] = useState(false)
  const [finalMusicUnlocked, setFinalMusicUnlocked] = useState(false)
  const lastMusicRef = useRef<string | null>(null)

  const hasEnteredTheClub = useMainStore((state) => state.isInTheClub)
  const setHasEnteredTheClub = useMainStore((state) => state.setHasEnteredTheClub)
  const currentGame = useMainStore((state) => state.currentGame)
  const setCurrentScene = useMainStore((state) => state.setCurrentScene)
  const setPlayedGames = useMainStore((state) => state.setPlayedGames)
  const currentScene = useMainStore((state) => state.currentScene)

  const loadSounds = useSoundStore((state) => state.loadSounds)
  const playSound = useSoundStore((state) => state.playSound)
  const stopSound = useSoundStore((state) => state.stopSound)
  const sounds = useSoundStore((state) => state.sounds)

  const restartAdventureModalVisible = useModalStore(
    (state) => state.restartAdventureModal.isVisible,
  )
  const replayGameModalVisible = useModalStore((state) => state.replayGameModal.isVisible)
  const soundPermissionModalVisible = useModalStore((state) => state.soundPermissionModal.isVisible)
  const openModal = useModalStore((state) => state.openModal)

  useEffect(() => {
    const loadAllSounds = async () => {
      try {
        const soundUrls = await fetchFirebaseSoundUrls()
        await loadSounds(soundUrls)
      } catch (error) {
        console.error('Failed to load sounds:', error)
      }
    }

    loadAllSounds()
  }, [loadSounds])

  useEffect(() => {
    const isInTheClub = localStorage.getItem(IS_IN_THE_CLUB) === 'true'
    const storedScene = localStorage.getItem(CURRENT_SCENE) as SceneName
    const memoryGameState = localStorage.getItem(GAMES.MEMORY)
    const rightSequenceGameState = localStorage.getItem(GAMES.RIGHT_SEQUENCE)

    setCurrentScene(storedScene || scenes[0].name)
    setHasEnteredTheClub(isInTheClub)
    setPlayedGames(GAMES.MEMORY, memoryGameState === 'true')
    setPlayedGames(GAMES.RIGHT_SEQUENCE, rightSequenceGameState === 'true')

    /* Ensure the hydrated state is set to true after checking localStorage.
    This prevents rendering the component before client-side data is available,
    avoiding potential mismatches between server-rendered and client-rendered HTML. */
    setIsHydrated(true)
    openModal(Modals.SOUND_PERMISSION)
  }, [setHasEnteredTheClub, setCurrentScene, setPlayedGames, openModal])

  useEffect(() => {
    if (!isHydrated || soundPermissionModalVisible) return

    let backgroundMusic: string

    if (currentScene === SCENES.RECORD_PLAYER && !finalMusicUnlocked) {
      setFinalMusicUnlocked(true)
      backgroundMusic = 'global_final'
    } else if (finalMusicUnlocked) {
      backgroundMusic = 'global_final'
    } else {
      backgroundMusic = 'global_background'
    }

    if (lastMusicRef.current && lastMusicRef.current !== backgroundMusic) {
      stopSound(lastMusicRef.current)
    }

    if (lastMusicRef.current !== backgroundMusic) {
      playSound(backgroundMusic)
      lastMusicRef.current = backgroundMusic
    }
  }, [
    isHydrated,
    playSound,
    soundPermissionModalVisible,
    sounds,
    currentScene,
    finalMusicUnlocked,
    stopSound,
  ])

  if (!isHydrated) {
    return null
  }

  return (
    <main className={styles.main}>
      {soundPermissionModalVisible ? (
        <SoundPermissionModal />
      ) : hasEnteredTheClub ? (
        <Scene />
      ) : (
        <IntroModal />
      )}
      {currentGame && <Game gameName={currentGame} />}
      {restartAdventureModalVisible && <RestartAdventureModal />}
      {replayGameModalVisible && <ReplayGameModal />}
      <Footer />
    </main>
  )
}
