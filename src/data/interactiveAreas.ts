import { GAMES } from '@/types/games'
import { EFFECTS, SCENES } from '@/types/scenes'

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
    y: 0.8,
    radius: 115,
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
  exitRecordPlayer: {
    x: 0.89,
    y: 0.01,
    radius: 60,
  },
  stage: {
    x: 0.32,
    y: 0.22,
    radius: 220,
  },
  recordPlayerBigButton: {
    x: 0.76,
    y: 0.71,
    radius: 55,
  },
  recordPlayerSmallButton: {
    x: 0.68,
    y: 0.74,
    radius: 40,
  },
}

const interactiveAreasInit = {
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
    description: 'Quitter le club',
  },
  exitClubFromLoungeWithEmptyPlayer: {
    surface: areas.exitDoor,
    navigateTo: CLUB_ENTRANCE_OPENED_TO_EMPTY_PLAYER,
    description: 'Quitter le club',
  },
  exitClubFromFinal: {
    surface: areas.exitDoor,
    navigateTo: CLUB_ENTRANCE_OPENED_FINAL,
    description: 'Quitter le club',
  },
  boxToOpen: {
    surface: areas.box,
    navigateTo: LOUNGE_EMPTY_PLAYER,
    description: 'Ouvrir la boîte',
  },
  stage: {
    surface: areas.stage,
    openGame: RIGHT_SEQUENCE,
    description: 'Ecouter le groupe (active le jeu "la Séquence Musicale")',
  },
  recordsOnTheWall: {
    surface: areas.records,
    openGame: MEMORY,
    description: 'Choisir un disque (active le jeu "Memory")',
  },
  recordPlayerEmpty: {
    surface: areas.recordplayer,
    description: `Une très jolie platine vinyle mais il manque un disque pour que l'on puisse en profiter.`,
  },
  recordPlayer: {
    surface: areas.recordplayer,
    description: `Découvrir le disque..."Ooh-shoo-bee-doo-bee-doo"`,
    navigateTo: RECORD_PLAYER,
  },
  backToLounge: {
    surface: areas.exitRecordPlayer,
    navigateTo: LOUNGE_FINAL,
    description: 'Retourner dans le club',
  },
  recordPlayerButtonPrimary: {
    surface: areas.recordPlayerBigButton,
    description: 'Crédits',
    effect: EFFECTS.OPEN_MODAL,
  },
  recordPlayerButtonSecondary: {
    surface: areas.recordPlayerSmallButton,
    description: '62 ballons !',
    effect: EFFECTS.MORE_BALLOONS,
  },
}

export default interactiveAreasInit
