'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ibmPlexMono } from './layout'
import styles from './page.module.css'
import Scene from '@/components/Scene'
import { IS_IN_THE_CLUB } from '@/constants/scenes'
import Game from '@/games'
import Intro from '@/modals/Intro'
import useMainStore from '@/stores/mainStore'

export default function Home() {
  const [isHydrated, setIsHydrated] = useState(false)

  const isSoundOn = useMainStore((state) => state.isSoundOn)
  const toggleSoundButton = useMainStore((state) => state.toggleSound)
  // const hasEnteredTheClub = useMainStore((state) => state.isInTheClub)
  const hasEnteredTheClub = false // TODO remove when localStorage is implemented
  const setHasEnteredTheClub = useMainStore((state) => state.setHasEnteredTheClub)
  const playGame = useMainStore((state) => state.playGame)

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

  const soundIcon = isSoundOn ? 'soundOn' : 'soundOff'

  return (
    <main className={styles.main}>
      {playGame && <Game gameName={playGame} />}
      {hasEnteredTheClub ? <Scene /> : <Intro />}
      <footer className={styles.footer}>
        {' '}
        Le Club de Jazz par{' '}
        <a href={'https://kinalone.dev'} target="_blank" rel="noopener noreferrer">
          MKS
        </a>{' '}
        © 2025 ||{' '}
        <button className={`${styles.resetButton} ${ibmPlexMono.className}`}>
          recommencer l&apos;aventure
        </button>{' '}
        ||{' '}
        <button className={styles.toggleSoundButton} onClick={() => toggleSoundButton()}>
          {' '}
          <Image src={`/icons/icon_${soundIcon}.png`} alt="Son" width={18} height={18} />
        </button>
      </footer>
    </main>
  )
}
