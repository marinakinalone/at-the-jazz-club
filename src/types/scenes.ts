import { SCENES } from '@/constants/scenes'
import { GameName } from './games'

export type SceneName = (typeof SCENES)[keyof typeof SCENES]

export interface IInteractiveArea {
  area: string
  x: number
  y: number
  radius?: number
  width?: number
  height?: number
  description: string
  navigateTo?: SceneName
  openGame?: GameName
}

export interface IScene {
  id: number
  name: SceneName
  unblocked: boolean
  message: string
  interactiveAreas: IInteractiveArea[]
}
