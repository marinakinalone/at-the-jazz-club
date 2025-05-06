import { IScene } from '@/types/scenes'
import { SCENES } from '@/constants/scenes'
import { GAMES } from '@/constants/games'

const { CLUB_ENTRANCE, LOUNGE_WITH_BOX, LOUNGE_EMPTY_PLAYER, LOUNGE_FINAL, RECORD_PLAYER } = SCENES

const { MEMORY, RIGHT_SEQUENCE } = GAMES

const interactiveAreasInit = {
  enterClub: {
    area: 'door',
    openGame: RIGHT_SEQUENCE,
    x: 0.33,
    y: 0.43,
    width: 110,
    height: 220,
    description: `La porte d'entrée du club. On dirait qu'elle est fermée à clé. Peut-être qu'il y a un moyen de l'ouvrir ?`,
  },
  exitClub: {
    area: 'door',
    navigateTo: CLUB_ENTRANCE,
    x: 0.8,
    y: 0.21,
    width: 80,
    height: 270,
    description: 'Sortir du club',
  },
  boxToOpen: {
    area: 'box',
    navigateTo: LOUNGE_EMPTY_PLAYER,
    x: 0.35,
    y: 0.81,
    radius: 125,
    description: 'Ouvrir la boîte',
  },
  stage: {
    area: 'stage',
    openGame: RIGHT_SEQUENCE,
    x: 0.34,
    y: 0.24,
    radius: 220,
    description: 'TBD',
  },
  recordsOnTheWall: {
    area: 'records',
    openGame: MEMORY,
    x: 0.03,
    y: 0.13,
    width: 160,
    height: 140,
    description: 'TBD',
  },
  recordPlayer: {
    area: 'recordplayer',
    description: `Un très jolie platine vinyle mais il manque un disque pour que l'on puisse en profiter. Que joue-t-on aujourd'hui ?`,
    x: 0.05,
    y: 0.62,
    height: 80,
    width: 150,
  },
  backToLounge: {
    area: 'back',
    navigateTo: LOUNGE_FINAL,
    x: 0.89,
    y: 0.01,
    radius: 70,
    description: 'TBD',
  },
}

const { backToLounge, enterClub, exitClub, boxToOpen, recordPlayer, recordsOnTheWall, stage } =
  interactiveAreasInit

const scenes: IScene[] = [
  {
    id: 0,
    name: CLUB_ENTRANCE,
    unblocked: true,
    message: 'message 0',
    interactiveAreas: [enterClub],
  },
  {
    id: 1,
    name: LOUNGE_WITH_BOX,
    unblocked: false,
    message: 'message 1',
    interactiveAreas: [exitClub, boxToOpen],
  },
  {
    id: 2,
    name: LOUNGE_EMPTY_PLAYER,
    unblocked: false,
    message: 'message 2',
    interactiveAreas: [exitClub, recordsOnTheWall, stage, recordPlayer],
  },
  {
    id: 3,
    name: LOUNGE_FINAL,
    unblocked: false,
    message: 'message 3',
    interactiveAreas: [exitClub, stage, recordsOnTheWall, recordPlayer],
  },
  {
    id: 4,
    name: RECORD_PLAYER,
    unblocked: false,
    message: 'message 4',
    interactiveAreas: [backToLounge],
  },
]

export default scenes
