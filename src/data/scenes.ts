import interactiveAreasInit from './interactiveAreas'
import { IScene, SCENES } from '@/types/scenes'

const {
  CLUB_ENTRANCE_CLOSED,
  CLUB_ENTRANCE_OPENED_FINAL,
  CLUB_ENTRANCE_OPENED_TO_EMPTY_PLAYER,
  CLUB_ENTRANCE_OPENED_TO_BOX,
  LOUNGE_WITH_BOX,
  LOUNGE_EMPTY_PLAYER,
  LOUNGE_FINAL,
  RECORD_PLAYER,
} = SCENES

const {
  backToLounge,
  enterClubWithBox,
  enterClubWithEmptyPlayer,
  enterClubFinal,
  exitClubFromFinal,
  exitClubFromLoungeWithBox,
  exitClubFromLoungeWithEmptyPlayer,
  boxToOpen,
  playToEnterClub,
  recordPlayer,
  recordPlayerEmpty,
  recordsOnTheWall,
  stage,
} = interactiveAreasInit

const scenes: IScene[] = [
  {
    id: 0,
    name: CLUB_ENTRANCE_CLOSED,
    message: 'Bienvenue au club de jazz ! On entre ?',
    interactiveAreas: [playToEnterClub],
  },
  {
    id: 1,
    name: CLUB_ENTRANCE_OPENED_TO_BOX,

    message: `L'entrée du club`,
    interactiveAreas: [enterClubWithBox],
  },
  {
    id: 2,
    name: CLUB_ENTRANCE_OPENED_TO_EMPTY_PLAYER,

    message: `L'entrée du club`,
    interactiveAreas: [enterClubWithEmptyPlayer],
  },
  {
    id: 3,
    name: CLUB_ENTRANCE_OPENED_FINAL,

    message: `L'entrée du club`,
    interactiveAreas: [enterClubFinal],
  },
  {
    id: 4,
    name: LOUNGE_WITH_BOX,

    message: 'message 1',
    interactiveAreas: [exitClubFromLoungeWithBox, boxToOpen, stage],
  },
  {
    id: 5,
    name: LOUNGE_EMPTY_PLAYER,

    message: 'message 2',
    interactiveAreas: [
      exitClubFromLoungeWithEmptyPlayer,
      recordsOnTheWall,
      stage,
      recordPlayerEmpty,
    ],
  },
  {
    id: 6,
    name: LOUNGE_FINAL,

    message: 'message 3',
    interactiveAreas: [exitClubFromFinal, stage, recordsOnTheWall, recordPlayer],
  },
  {
    id: 7,
    name: RECORD_PLAYER,

    message:
      'Tadaa ! Bravo, tu as complété aventure du club de jazz. Tu peux maintenant rejouer aux mini-jeux o...u',
    interactiveAreas: [backToLounge],
  },
]

export default scenes
