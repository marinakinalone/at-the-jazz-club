import { IScene } from "@/types/scenes";
import { SCENES } from "@/constants/scenes";
import { GAMES } from "@/constants/games";

const { CLUB_ENTRANCE, LOUNGE_WITH_BOX, LOUNGE_EMPTY_PLAYER, LOUNGE_FINAL, RECORD_PLAYER } = SCENES;

const { MEMORY, RIGHT_SEQUENCE} = GAMES

// TODO: save interactive areas data to avoid repetition

const scenes: IScene[] = [
    {   
        id: 0,
        name: CLUB_ENTRANCE,
        unblocked: true,
        interactiveAreas: [
            { area: "door", openGame: RIGHT_SEQUENCE, x: 0.5, y: 0.8, radius: 0.1 },
        ],
    },
    {
        id: 1,
        name: LOUNGE_WITH_BOX,
        unblocked: false,
        interactiveAreas: [
            { area: "door", navigateTo: CLUB_ENTRANCE, x: 0.5, y: 0.8, radius: 0.1 },
            { area: "box", navigateTo: LOUNGE_EMPTY_PLAYER, x: 0.5, y: 0.5, radius: 0.1 },
        ],
    },
    {
        id: 2,
        name: LOUNGE_EMPTY_PLAYER,
        unblocked: false,
        interactiveAreas: [
            { area: "door", navigateTo: CLUB_ENTRANCE, x: 0.5, y: 0.8, radius: 0.1 },
            { area: "stage", openGame: RIGHT_SEQUENCE, x: 0.5, y: 0.5, radius: 0.1 },
            { area: "recordplayer", message: `Un très jolie platine vinyle mais il manque un disque pour que l'on puisse en profiter. Que joue-t-on aujourd'hui ?`, x: 0.5, y: 0.5, radius: 0.1 },
            { area: "records", openGame: MEMORY, x: 0.5, y: 0.5, radius: 0.1 },
        ],
    },
    {
        id: 3,
        name: LOUNGE_FINAL,
        unblocked: false,
        interactiveAreas: [
            { area: "door", navigateTo: CLUB_ENTRANCE, x: 0.5, y: 0.8, radius: 0.1 },
            { area: "stage", openGame: RIGHT_SEQUENCE, x: 0.5, y: 0.5, radius: 0.1 },
            { area: "recordplayer", navigateTo: RECORD_PLAYER, x: 0.5, y: 0.5, radius: 0.1 },
            { area: "records", openGame: MEMORY, x: 0.5, y: 0.5, radius: 0.1 },
        ],
    },
    {
        id: 4,
        name: RECORD_PLAYER,
        unblocked: false,
        interactiveAreas: [
            { area: "back", navigateTo: LOUNGE_FINAL, x: 0.5, y: 0.8, radius: 0.1 },
        ],
    },
]

export default scenes;