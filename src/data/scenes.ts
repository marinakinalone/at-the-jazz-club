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
    message: `Devant le club de jazz`,
    interactiveAreas: [enterClubWithBox],
  },
  {
    id: 2,
    name: CLUB_ENTRANCE_OPENED_TO_EMPTY_PLAYER,
    message: `Devant le club de jazz`,
    interactiveAreas: [enterClubWithEmptyPlayer],
  },
  {
    id: 3,
    name: CLUB_ENTRANCE_OPENED_FINAL,

    message: `Devant le club de jazz`,
    interactiveAreas: [enterClubFinal],
  },
  {
    id: 4,
    name: LOUNGE_WITH_BOX,
    message: "Oh, un présent ! Tu devrais l'ouvrir !",
    interactiveAreas: [exitClubFromLoungeWithBox, boxToOpen, stage],
  },
  {
    id: 5,
    name: LOUNGE_EMPTY_PLAYER,

    message: `A l'intérieur du club, cela manque un peu de musique...`,
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
    message: `Quel swing ! C'est un chouette disque que tu as trouvé là !`,
    interactiveAreas: [exitClubFromFinal, stage, recordsOnTheWall, recordPlayer],
  },
  {
    id: 7,
    name: RECORD_PLAYER,
    message: `Bravo, tu as complété l'aventure du club de jazz et découvert le message "secret" !`,
    interactiveAreas: [backToLounge],
  },
]

export default scenes
