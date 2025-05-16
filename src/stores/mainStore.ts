import { create } from 'zustand'
import { CURRENT_SCENE, IS_IN_THE_CLUB } from '@/constants/scenes'
import scenes from '@/data/scenes'
import { GameName, GAMES } from '@/types/games'
import { IInteractiveArea, SceneName } from '@/types/scenes'

const { RIGHT_SEQUENCE, MEMORY } = GAMES

interface IStoreState {
  scenesState: { name: SceneName; unblocked: boolean }[]
  currentScene: SceneName
  isInTheClub: string | boolean
  isSoundOn: boolean

  playGame: GameName | false
  hasPlayedGames: {
    [key in GameName]: boolean
  }

  setCurrentScene: (sceneName: SceneName) => void
  updateSceneState: ({
    sceneName,
    unblocked,
    interactiveAreas,
  }: {
    sceneName: SceneName
    unblocked?: boolean
    interactiveAreas?: IInteractiveArea[]
  }) => void
  setHasEnteredTheClub: (value: boolean) => void
  setPlayGame: (gameName: GameName | false) => void
  setHasPlayedGames: (gameName: GameName) => void
  toggleSound: () => void
}

// TODO add loading state too.
// add reset game button

const useMainStore = create<IStoreState>((set) => ({
  // use localStorage to get the values
  scenesState: scenes.map((scene) => {
    return {
      name: scene.name,
      unblocked: scene.unblocked,
    }
  }),
  currentScene: scenes[0].name,
  isInTheClub: false,
  isSoundOn: true,

  playGame: false,
  hasPlayedGames: {
    [RIGHT_SEQUENCE]: false,
    [MEMORY]: false,
  },

  setCurrentScene: (sceneName: SceneName) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_SCENE, sceneName);
    }
    set({
      currentScene: sceneName,
    });
  },
  updateSceneState: ({
    sceneName,
    unblocked = true,
    interactiveAreas,
  }: {
    sceneName: SceneName;
    unblocked?: boolean;
    interactiveAreas?: IInteractiveArea[];
  }) => {
    // TODO update localStorage
    set((state) => ({
      scenesState: state.scenesState.map((scene) =>
        scene.name === sceneName ? { ...scene, unblocked, interactiveAreas } : scene
      ),
    }));
  },
  setHasEnteredTheClub: (value: boolean = false) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(IS_IN_THE_CLUB, value.toString());
    }
    set({ isInTheClub: value });
  },
  setPlayGame: (gameName: GameName | false) => {
    set({ playGame: gameName });
  },
  setHasPlayedGames: (gameName: GameName) => {
    set((state) => ({
      hasPlayedGames: {
        ...state.hasPlayedGames,
        [gameName]: true,
      },
    }));
  },
  toggleSound: () => {
    set((state) => ({
      isSoundOn: !state.isSoundOn,
    }));
  },
}))

export default useMainStore
