import { create } from 'zustand'
import { GameName } from '@/types/games'
import { IModalState, ModalKeys } from '@/types/modals'

type ModalStoreState = {
  [key in ModalKeys]: IModalState
} & {
  openModal: (modalKey: ModalKeys, game?: GameName) => void
  closeModal: (modalKey: ModalKeys, animationDuration: number, callback?: () => void) => void
}

const defaultModalState: IModalState = {
  isVisible: false,
  isClosing: false,
}

const useModalStore = create<ModalStoreState>((set) => ({
  introModal: { ...defaultModalState },
  winningModal: { ...defaultModalState },
  restartAdventureModal: { ...defaultModalState },
  creditsModal: { ...defaultModalState },
  replayGameModal: { ...defaultModalState },
  soundPermissionModal: { ...defaultModalState },
  endCreditsModal: { ...defaultModalState }, // TODO implement
  warningMemoryGameModal: { ...defaultModalState }, // TODO implement
  openBoxModal: { ...defaultModalState }, // TODO implement

  openModal: (modalKey, game) => {
    set({
      [modalKey]: {
        isVisible: true,
        isClosing: false,
        gameName: game,
      },
    })
  },

  closeModal: (modalKey, animationDuration, callback) => {
    set((state) => ({
      [modalKey]: {
        ...state[modalKey],
        isClosing: true,
      },
    }))

    setTimeout(() => {
      if (callback) {
        callback()
      }
      set({
        [modalKey]: {
          isVisible: false,
          isClosing: false,
        },
      })
    }, animationDuration)
  },
}))

export default useModalStore
