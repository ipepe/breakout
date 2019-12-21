import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {normalize} from "../math/vec2.js";

const QUERY = Has.Transform2D | Has.MoveDirection | Has.Draw;

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

    if(transform.Translation[0] < game.World.Move[entity].MinimumXPosition + game.World.Draw[entity].SizeX/2){
        transform.Translation[0] = game.World.Move[entity].MinimumXPosition + game.World.Draw[entity].SizeX/2
    }
    if(transform.Translation[0] > game.World.Move[entity].MaximumXPosition - game.World.Draw[entity].SizeX/2){
        transform.Translation[0] = game.World.Move[entity].MaximumXPosition - game.World.Draw[entity].SizeX/2
    }

    if(transform.Translation[1] < game.World.Move[entity].MinimumYPosition + game.World.Draw[entity].SizeY/2){
        transform.Translation[1] = game.World.Move[entity].MinimumYPosition + game.World.Draw[entity].SizeY/2
    }
    if(transform.Translation[1] > game.World.Move[entity].MaximumYPosition - game.World.Draw[entity].SizeY/2){
        transform.Translation[1] = game.World.Move[entity].MaximumYPosition - game.World.Draw[entity].SizeY/2
    }

    transform.Dirty = true;
}
