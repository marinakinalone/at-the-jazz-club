'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import Footer from '@/components/Footer'
import Scene from '@/components/Scene'
import { BACKGROUND_MUSIC } from '@/constants/music'
import { CURRENT_SCENE, IS_IN_THE_CLUB } from '@/constants/scenes'
import scenes from '@/data/scenes'
import Game from '@/games'
import CreditsModal from '@/modals/Credits'
import IntroModal from '@/modals/Intro'
import MinimumScreenSize from '@/modals/MinimumScreenSize'
import ReplayGameModal from '@/modals/ReplayGame'
import RestartAdventureModal from '@/modals/RestartAdventure'
import SoundPermissionModal from '@/modals/SoundPermission'
import useMainStore from '@/stores/mainStore'
import useModalStore from '@/stores/modalStore'
import useSoundStore from '@/stores/soundStore'
import { GAMES } from '@/types/games'
import { Modals } from '@/types/modals'
import { SceneName, SCENES } from '@/types/scenes'
import { fetchFirebaseSoundUrls } from '@/utils/firebase'

export default function Home() {
  const [isHydrated, setIsHydrated] = useState(false)
  const [finalMusicUnlocked, setFinalMusicUnlocked] = useState(false)
  const [soundPermissionRequested, setSoundPermissionRequested] = useState(false)
  const lastMusicRef = useRef<string | null>(null)

  const hasEnteredTheClub = useMainStore((state) => state.isInTheClub)
  const setHasEnteredTheClub = useMainStore((state) => state.setHasEnteredTheClub)
  const currentGame = useMainStore((state) => state.currentGame)
  const setCurrentScene = useMainStore((state) => state.setCurrentScene)
  const setPlayedGames = useMainStore((state) => state.setPlayedGames)
  const currentScene = useMainStore((state) => state.currentScene)
  const setSupportedScreenFormat = useMainStore((state) => state.setSupportedScreenFormat)
  const supportedScreenFormat = useMainStore((state) => state.supportedScreenFormat)

  const loadSounds = useSoundStore((state) => state.loadSounds)
  const playSound = useSoundStore((state) => state.playSound)
  const stopSound = useSoundStore((state) => state.stopSound)
  const isLoaded = useSoundStore((state) => state.isLoaded)

  const restartAdventureModalVisible = useModalStore(
    (state) => state.restartAdventureModal.isVisible,
  )
  const replayGameModalVisible = useModalStore((state) => state.replayGameModal.isVisible)
  const soundPermissionModalVisible = useModalStore((state) => state.soundPermissionModal.isVisible)
  const minimumScreenSizeModalVisible = useModalStore(
    (state) => state.minimumScreenSizeModal.isVisible,
  )
  const endCreditsModalVisible = useModalStore((state) => state.endCreditsModal.isVisible)

  const openModal = useModalStore((state) => state.openModal)
  const closeModal = useModalStore((state) => state.closeModal)

  useEffect(() => {
    const handleResize = () => {
      setSupportedScreenFormat()
    }

    // Check initial screen size
    setSupportedScreenFormat()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (supportedScreenFormat === false) {
      openModal(Modals.MINIMUM_SCREEN_SIZE)
    } else if (supportedScreenFormat === true && minimumScreenSizeModalVisible) {
      closeModal(Modals.MINIMUM_SCREEN_SIZE, 0)
    }
  }, [supportedScreenFormat, openModal, closeModal, minimumScreenSizeModalVisible])

  useEffect(() => {
    // Only open sound permission modal when screen is supported, app is hydrated, and it hasn't been requested yet
    if (
      supportedScreenFormat === true &&
      isHydrated &&
      !soundPermissionRequested &&
      !minimumScreenSizeModalVisible
    ) {
      openModal(Modals.SOUND_PERMISSION)
      setSoundPermissionRequested(true)
    }
  }, [
    supportedScreenFormat,
    isHydrated,
    soundPermissionRequested,
    minimumScreenSizeModalVisible,
    openModal,
    setSoundPermissionRequested,
  ])

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
  }, [setHasEnteredTheClub, setCurrentScene, setPlayedGames, openModal, supportedScreenFormat])

  useEffect(() => {
    if (!isHydrated || soundPermissionModalVisible || !isLoaded) return

    if (currentGame) {
      if (lastMusicRef.current) {
        stopSound(lastMusicRef.current)
        lastMusicRef.current = null
      }
      return
    }
    let backgroundMusic: string

    if (currentScene === SCENES.RECORD_PLAYER && !finalMusicUnlocked) {
      setFinalMusicUnlocked(true)
      backgroundMusic = BACKGROUND_MUSIC.final
    } else if (finalMusicUnlocked) {
      backgroundMusic = BACKGROUND_MUSIC.final
    } else {
      backgroundMusic = BACKGROUND_MUSIC.regular
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
    currentScene,
    finalMusicUnlocked,
    stopSound,
    currentGame,
    isLoaded,
  ])

  if (!isHydrated) {
    return null
  }

  return (
    <main className={styles.main}>
      {soundPermissionModalVisible && !minimumScreenSizeModalVisible ? (
        <SoundPermissionModal />
      ) : hasEnteredTheClub ? (
        <Scene />
      ) : (
        <IntroModal />
      )}
      {currentGame && <Game gameName={currentGame} />}
      {restartAdventureModalVisible && <RestartAdventureModal />}
      {replayGameModalVisible && <ReplayGameModal />}
      {endCreditsModalVisible && <CreditsModal />}
      {minimumScreenSizeModalVisible && <MinimumScreenSize />}
      <Footer />
    </main>
  )
}
