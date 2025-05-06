'use client'
import { useEffect, useState } from 'react'
import Intro from '@/modals/Intro'
import styles from './page.module.css'
import useStore from '@/store'
import Scene from '@/components/Scene'
import { IS_IN_THE_CLUB } from '@/constants/scenes'

export default function Home() {
  const hasEnteredTheClub = useStore((state) => state.isInTheClub)
  const setHasEnteredTheClub = useStore((state) => state.setHasEnteredTheClub)
  const [isHydrated, setIsHydrated] = useState(false)

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

  return <main className={styles.main}>{hasEnteredTheClub ? <Scene /> : <Intro />}</main>
}
