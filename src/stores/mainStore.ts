import { create } from 'zustand'
import { CURRENT_SCENE, IS_IN_THE_CLUB } from '@/constants/scenes'
import scenes from '@/data/scenes'
import { GameName, GAMES } from '@/types/games'
import { SceneName } from '@/types/scenes'
import { isMobileDevice, isTooSmall } from '@/utils/screenSpecs'

const { RIGHT_SEQUENCE, MEMORY } = GAMES

interface IStoreState {
  currentScene: SceneName
  isInTheClub: string | boolean
  currentGame: GameName | false
  playedGames: {
    [key in GameName]: boolean
  }
  supportedScreenFormat: boolean | undefined

  setCurrentScene: (sceneName: SceneName) => void
  setHasEnteredTheClub: (value: boolean) => void
  playGame: (gameName: GameName | false) => void
  setPlayedGames: (gameName: GameName, value?: boolean) => void
  setSupportedScreenFormat: () => void
}

const useMainStore = create<IStoreState>((set) => ({
  currentScene: scenes[0].name,
  isInTheClub: false,
  currentGame: false,
  playedGames: {
    [RIGHT_SEQUENCE]: false,
    [MEMORY]: false,
  },
  supportedScreenFormat: true,

  setCurrentScene: (sceneName) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_SCENE, sceneName)
    }
    set({
      currentScene: sceneName,
    })
  },
  setHasEnteredTheClub: (value = false) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(IS_IN_THE_CLUB, value.toString())
    }
    set({ isInTheClub: value })
  },
  playGame: (gameName) => {
    set({ currentGame: gameName })
  },
  setPlayedGames: (gameName, value = true) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(gameName, value.toString())
    }
    set((state) => ({
      playedGames: {
        ...state.playedGames,
        [gameName]: value,
      },
    }))
  },
  setSupportedScreenFormat: () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      set({ supportedScreenFormat: undefined })
      return
    }

    const isSupported = !isTooSmall() || !isMobileDevice()
    set({ supportedScreenFormat: isSupported })
  },
}))

export default useMainStore
