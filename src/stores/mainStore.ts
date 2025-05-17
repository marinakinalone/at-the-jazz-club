import { create } from 'zustand'
import { CURRENT_SCENE, IS_IN_THE_CLUB } from '@/constants/scenes'
import scenes from '@/data/scenes'
import { GameName, GAMES } from '@/types/games'
import { SceneName } from '@/types/scenes'

const { RIGHT_SEQUENCE, MEMORY } = GAMES

interface IStoreState {
  currentScene: SceneName
  isInTheClub: string | boolean
  isSoundOn: boolean
  currentGame: GameName | false
  playedGames: {
    [key in GameName]: boolean
  }

  setCurrentScene: (sceneName: SceneName) => void
  setHasEnteredTheClub: (value: boolean) => void
  playGame: (gameName: GameName | false) => void
  setPlayedGames: (gameName: GameName, value?: boolean) => void
  toggleSound: () => void
}

// TODO add loading state too.
const useMainStore = create<IStoreState>((set) => ({
  currentScene: scenes[0].name,
  isInTheClub: false,
  isSoundOn: true,
  currentGame: false,
  playedGames: {
    [RIGHT_SEQUENCE]: false,
    [MEMORY]: false,
  },

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
  toggleSound: () => {
    set((state) => ({
      isSoundOn: !state.isSoundOn,
    }))
  },
}))

export default useMainStore
