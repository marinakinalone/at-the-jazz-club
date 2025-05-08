import { GAMES } from '@/constants/games'
import { IS_IN_THE_CLUB } from '@/constants/scenes'
import scenes from '@/data/scenes'
import { GameName } from '@/types/games'
import { IInteractiveArea, SceneName } from '@/types/scenes'
import { create } from 'zustand'

const { RIGHT_SEQUENCE, MEMORY } = GAMES

interface StoreState {
  scenesState: { name: SceneName; unblocked: boolean }[]
  currentScene: SceneName
  isInTheClub: string | boolean

  playGame: GameName | false
  hasPlayedGames: {
    [key: GameName]: boolean
  }

  setCurrentScene: (sceneName: SceneName) => void
  updateSceneState: ({sceneName, unblocked, interactiveAreas}:{sceneName: SceneName, unblocked?: boolean, interactiveAreas?: IInteractiveArea[]}) => void
  setHasEnteredTheClub: (value: boolean) => void
  setPlayGame: (gameName: GameName | false) => void
  setHasPlayedGames: (gameName: GameName) => void
}

// TODO add loading state too.
// add reset game button

const useStore = create<StoreState>((set) => ({
  // use localStorage to get the values
  scenesState: scenes.map((scene) => {
    return {
      name: scene.name,
      unblocked: scene.unblocked,
    }
  }),
  currentScene: scenes[0].name,
  isInTheClub: false,

  playGame: false,
  hasPlayedGames: {
    [RIGHT_SEQUENCE]: false,
    [MEMORY]: false,
  },

  setCurrentScene: (sceneName) =>
    // TODO update localStorage
    set({
      currentScene: sceneName,
    }),
  updateSceneState: ({sceneName, unblocked = true, interactiveAreas}) =>
    // TODO update localStorage
    set((state) => ({
      scenesState: state.scenesState.map((scene) =>
        scene.name === sceneName ? { ...scene, unblocked, interactiveAreas } : scene,
      ),
    })),
  setHasEnteredTheClub: (value = true) => {
    // if (typeof window !== 'undefined' && value === true) {
    //   localStorage.setItem(IS_IN_THE_CLUB, 'true')
    // }
    set({ isInTheClub: value })
  },
  setPlayGame: (gameName) => {
    set({ playGame: gameName })
  },

  setHasPlayedGames: (gameName) =>
    set((state) => ({
      hasPlayedGames: {
        ...state.hasPlayedGames,
        [gameName]: true,
      },
    })),
}))

export default useStore
