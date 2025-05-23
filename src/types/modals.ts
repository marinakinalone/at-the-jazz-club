import { GameName } from './games'
export interface IModalState {
  isVisible: boolean
  isClosing: boolean
  gameName?: GameName
}

export enum Modals {
  intro = 'introModal',
  winning = 'winningModal',
  restartAdventure = 'restartAdventureModal',
  credits = 'creditsModal',
  replayGame = 'replayGameModal',
}

export type ModalKeys = (typeof Modals)[keyof typeof Modals]

export enum AnimationName {
  swashIn = 'swashIn',
  puffIn = 'puffIn',
  swashOut = 'swashOut',
}

export enum AnimationTimeout {
  immediate = 0,
  short = 300,
  medium = 700,
  long = 1000,
}

export enum AnimationDuration {
  immediate = '0s',
  short = '0.4s',
  medium = '0.8s',
  long = '1.2s',
}
