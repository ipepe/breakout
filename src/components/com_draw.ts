import {Entity, Game} from "../game.js";
import {Has} from "./com_index.js";

export interface Draw {
    SizeX: number;
    SizeY: number;
}

export function draw_rect(SizeX: number, SizeY: number) {
    return (game: Game, entity: Entity) => {
        game.World.Mask[entity] |= Has.Draw;
        game.World.Draw[entity] = <Draw>{
            SizeX,
            SizeY
        };
    };
}
