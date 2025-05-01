import scenes from "@/data/scenes";
import {IInteractiveArea, IScene, SceneName } from "@/types/scenes";
import { create } from "zustand";

interface StoreState {
    scenesState: { name: SceneName; unblocked: boolean }[];
    currentScene: SceneName;
    interactiveAreas: IInteractiveArea[];
    setCurrentScene: (sceneName: SceneName) => void;
    updateSceneState: (sceneName: SceneName, unblocked: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
    scenesState: scenes.map((scene) => {
        return {
            name: scene.name,
            unblocked: scene.unblocked,
        }
    } ),
    currentScene: scenes[0].name,
    interactiveAreas: scenes[0].interactiveAreas,

    setCurrentScene: (sceneName) => set({ currentScene: sceneName }),
    updateSceneState: (sceneName, unblocked) => set((state) => ({
        scenesState: state.scenesState.map((scene) =>
            scene.name === sceneName ? { ...scene, unblocked } : scene
        ),
    })),
}))

export default useStore;


