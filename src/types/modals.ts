import { GameName } from './games'
export interface IModalState {
  isVisible: boolean
  isClosing: boolean
  gameName?: GameName
}

export const Modals = {
  INTRO: 'introModal',
  WINNING: 'winningModal',
  RESTART_ADVENTURE: 'restartAdventureModal',
  CREDITS: 'creditsModal',
  REPLAY_GAME: 'replayGameModal',
  SOUND_PERMISSION: 'soundPermissionModal',
} as const

export type ModalKeys = (typeof Modals)[keyof typeof Modals]

export enum AnimationName {
  SWASH_IN = 'swashIn',
  PUFF_IN = 'puffIn',
  SWASH_OUT = 'swashOut',
}

export enum AnimationTimeout {
  IMMEDIATE = 0,
  SHORT = 300,
  MEDIUM = 700,
  LONG = 1000,
}

export enum AnimationDuration {
  IMMEDIATE = '0s',
  SHORT = '0.4s',
  MEDIUM = '0.8s',
  LONG = '1.2s',
}
