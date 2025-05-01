import { SCENES } from "@/constants/scenes";
import { GameName } from "./games";

export type SceneName = (typeof SCENES)[keyof typeof SCENES];

export interface IInteractiveArea {
    area: string;
    x: number;
    y: number;
    radius: number;
    message?: string; // TODO maybe mandatory
    navigateTo?: SceneName;
    openGame?: GameName;
};

export interface IScene {
    id: number;
    name: SceneName;
    unblocked: boolean;
    interactiveAreas: IInteractiveArea[];
};