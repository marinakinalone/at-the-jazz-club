import { GAMES } from '@/types/games'
import { SCENES } from '@/types/scenes'

const {
  CLUB_ENTRANCE_OPENED_FINAL,
  CLUB_ENTRANCE_OPENED_TO_EMPTY_PLAYER,
  CLUB_ENTRANCE_OPENED_TO_BOX,
  LOUNGE_WITH_BOX,
  LOUNGE_EMPTY_PLAYER,
  LOUNGE_FINAL,
  RECORD_PLAYER,
} = SCENES

const { MEMORY, RIGHT_SEQUENCE } = GAMES

const areas = {
    clubEntranceDoor: {
      x: 0.33,
      y: 0.43,
      width: 95,
      height: 200,
    },
    exitDoor: {
      x: 0.8,
      y: 0.21,
      width: 70,
      height: 240,
    },
    box: {
      x: 0.35,
      y: 0.80,
      radius: 115
    },
    recordplayer: {
      x: 0.04,
      y: 0.61,
      height: 80,
      width: 135,
    },
    records: {
      x: 0.04,
      y: 0.13,
      width: 130,
      height: 120,
    }, 
    exitRecordPlayer:{
      x: 0.89,
      y: 0.01,
      radius: 60,
    },
    stage: {
      x: 0.32,
      y: 0.22,
      radius: 220,
    }
  }

  export const interactiveAreasInit = {
    playToEnterClub: {
      surface: areas.clubEntranceDoor,
      openGame: RIGHT_SEQUENCE,
      description: `La porte d'entrée du club. On dirait qu'elle est fermée à clé.`,
    },
    enterClubWithBox: {
      surface: areas.clubEntranceDoor,
      navigateTo: LOUNGE_WITH_BOX,
      description: `Entrer dans le club`,
    },
    enterClubWithEmptyPlayer: {
      surface: areas.clubEntranceDoor,
      navigateTo: LOUNGE_EMPTY_PLAYER,
      description: `Entrer dans le club`,
    },
    enterClubFinal: {
      surface: areas.clubEntranceDoor,
      navigateTo: LOUNGE_FINAL,
      description: `Entrer dans le club`,
    },
    exitClubFromLoungeWithBox: {
      surface: areas.exitDoor,
      navigateTo: CLUB_ENTRANCE_OPENED_TO_BOX,
      description: 'Sortir du club',
    },
    exitClubFromLoungeWithEmptyPlayer: {
      surface: areas.exitDoor,
      navigateTo: CLUB_ENTRANCE_OPENED_TO_EMPTY_PLAYER,
      description: 'Sortir du club',
    },
    exitClubFromFinal: {
      surface: areas.exitDoor,
      navigateTo: CLUB_ENTRANCE_OPENED_FINAL,
      description: 'Sortir du club',
    },
    boxToOpen: {
      surface: areas.box,
      navigateTo: LOUNGE_EMPTY_PLAYER,
      description: 'Ouvrir la boîte',
    },
    stage: {
      surface: areas.stage,
      openGame: RIGHT_SEQUENCE,
      description: 'TBD',
    },
    recordsOnTheWall: {
      surface: areas.records,
      openGame: MEMORY,
      description: 'TBD',
    },
    recordPlayerEmpty: {
      surface: areas.recordplayer,
      description: `Une très jolie platine vinyle mais il manque un disque pour que l'on puisse en profiter. Que joue-t-on aujourd'hui ?`,
    },
    recordPlayer: {
      surface: areas.recordplayer,
      description: `sound sound sound`,
      navigateTo: RECORD_PLAYER,
    },
    backToLounge: {
      surface: areas.exitRecordPlayer,
      navigateTo: LOUNGE_FINAL,
      description: 'TBD',
    },
  }
  
  export default interactiveAreasInit