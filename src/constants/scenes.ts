export const SCENES = {
  CLUB_ENTRANCE_CLOSED: '0_club_entrance',
  CLUB_ENTRANCE_OPENED_TO_BOX: '1_club_entrance',
  CLUB_ENTRANCE_OPENED_TO_EMPTY_PLAYER: '2_club_entrance',
  CLUB_ENTRANCE_OPENED_FINAL: '3_club_entrance',
  LOUNGE_WITH_BOX: '4_lounge_with_box',
  LOUNGE_EMPTY_PLAYER: '5_lounge_empty_player',
  LOUNGE_FINAL: '6_lounge_final',
  RECORD_PLAYER: '7_record_player',
} as const

export const IS_IN_THE_CLUB = 'isInTheClub'
export const CURRENT_SCENE = 'currentScene'
