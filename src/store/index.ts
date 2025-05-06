import { IS_IN_THE_CLUB } from '@/constants/scenes'
import scenes from '@/data/scenes'
import { IInteractiveArea, SceneName } from '@/types/scenes'
import { create } from 'zustand'

interface StoreState {
  scenesState: { name: SceneName; unblocked: boolean }[]
  currentScene: SceneName
  interactiveAreas: IInteractiveArea[]
  isInTheClub: string | boolean
  setCurrentScene: (sceneName: SceneName) => void
  updateSceneState: (sceneName: SceneName, unblocked: boolean) => void
  setHasEnteredTheClub: (value: boolean) => void
}

// TODO add loading state too.

const useStore = create<StoreState>((set) => ({
  scenesState: scenes.map((scene) => {
    return {
      name: scene.name,
      unblocked: scene.unblocked,
    }
  }),
  currentScene: scenes[0].name,
  interactiveAreas: scenes[0].interactiveAreas,
  isInTheClub: false,

  setCurrentScene: (sceneName) =>
    set({
      currentScene: sceneName,
      interactiveAreas: scenes.find((scene) => scene.name === sceneName)?.interactiveAreas || [],
    }),
  updateSceneState: (sceneName, unblocked) =>
    set((state) => ({
      scenesState: state.scenesState.map((scene) =>
        scene.name === sceneName ? { ...scene, unblocked } : scene,
      ),
    })),
  setHasEnteredTheClub: (value = true) => {
    if (typeof window !== 'undefined' && value === true) {
      localStorage.setItem(IS_IN_THE_CLUB, 'true')
    }
    set({ isInTheClub: value })
  },
}))

export default useStore
