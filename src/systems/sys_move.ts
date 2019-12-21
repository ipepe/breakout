import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {Vec2} from "../math/index.js";
import {normalize} from "../math/vec2.js";

const QUERY = Has.Transform2D | Has.MoveDirection;

export function sys_move(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let direction = game.World.Move[entity].Direction;
    normalize(direction, direction);
    let speed = game.World.Move[entity].Speed;

    let transform = game.World.Transform2D[entity];
    transform.Translation[0] += direction[0] * speed * delta;
    transform.Translation[1] += direction[1] * speed * delta;

    if(transform.Translation[0] < game.World.Move[entity].MinimumXPosition){
        transform.Translation[0] = game.World.Move[entity].MinimumXPosition
    }
    if(transform.Translation[0] > game.World.Move[entity].MaximumXPosition){
        transform.Translation[0] = game.World.Move[entity].MaximumXPosition
    }

    if(transform.Translation[1] < game.World.Move[entity].MinimumYPosition){
        transform.Translation[1] = game.World.Move[entity].MinimumYPosition
    }
    if(transform.Translation[1] > game.World.Move[entity].MaximumYPosition){
        transform.Translation[1] = game.World.Move[entity].MaximumYPosition
    }

    transform.Dirty = true;
}
