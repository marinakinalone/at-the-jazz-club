import { GameName } from './games'

export enum SCENES {
  CLUB_ENTRANCE_CLOSED = '0_club_entrance',
  CLUB_ENTRANCE_OPENED_TO_BOX = '1_club_entrance',
  CLUB_ENTRANCE_OPENED_TO_EMPTY_PLAYER = '2_club_entrance',
  CLUB_ENTRANCE_OPENED_FINAL = '3_club_entrance',
  LOUNGE_WITH_BOX = '4_lounge_with_box',
  LOUNGE_EMPTY_PLAYER = '5_lounge_empty_player',
  LOUNGE_FINAL = '6_lounge_final',
  RECORD_PLAYER = '7_record_player',
}

export type SceneName = SCENES

interface ISurface {
  x: number
  y: number
  radius?: number
  width?: number
  height?: number
}

export interface IInteractiveArea {
  surface: ISurface
  description: string
  navigateTo?: SceneName
  openGame?: GameName
}

export interface IScene {
  id: number
  name: SceneName
  message: string
  interactiveAreas: IInteractiveArea[]
}
