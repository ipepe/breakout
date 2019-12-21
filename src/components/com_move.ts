import {Entity, Game} from "../game.js";
import {Has} from "./com_index.js";
import {Vec2} from "../math/index.js";

export interface Move {
    Direction: Vec2;
    Speed: number;
    MinimumXPosition: number;
    MaximumXPosition: number;
    MinimumYPosition: number;
    MaximumYPosition: number;
}

export function move(
    Direction: Vec2,
    Speed: number,
    MinimumXPosition: number,
    MaximumXPosition: number,
    MinimumYPosition: number,
    MaximumYPosition: number
) {

    return (game: Game, entity: Entity) => {
        game.World.Mask[entity] |= Has.MoveDirection;
        game.World.Move[entity] = <Move>{
            Direction,
            Speed,
            MinimumXPosition,
            MaximumXPosition,
            MinimumYPosition,
            MaximumYPosition
        };
    };
}
