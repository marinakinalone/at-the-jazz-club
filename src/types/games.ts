export const GAMES = {
  MEMORY: 'MEMORY',
  RIGHT_SEQUENCE: 'RIGHT_SEQUENCE',
} as const

export type GameName = keyof typeof GAMES
