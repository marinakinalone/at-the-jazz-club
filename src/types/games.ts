import { GAMES } from '../constants/games';

export type GameName = (typeof GAMES)[keyof typeof GAMES];