import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {Vec2} from "../math/index.js";
import {normalize} from "../math/vec2.js";

const QUERY = Has.Transform2D | Has.ControlBall | Has.MoveDirection;

export function sys_control_ball(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {

    let transform = game.World.Transform2D[entity];
    let move = game.World.Move[entity];

    if(transform.Translation[0]-1 < game.World.Move[entity].MinimumXPosition + game.World.Draw[entity].SizeX/2){
        game.World.Move[entity].Direction[0] = game.World.Move[entity].Direction[0] * -1
    }
    if(transform.Translation[0]+1 > game.World.Move[entity].MaximumXPosition - game.World.Draw[entity].SizeX/2){
        game.World.Move[entity].Direction[0] = game.World.Move[entity].Direction[0] * -1
    }

    if(transform.Translation[1]-1 < game.World.Move[entity].MinimumYPosition + game.World.Draw[entity].SizeY/2){
        game.World.Move[entity].Direction[1] = game.World.Move[entity].Direction[1] * -1
    }
    if(transform.Translation[1]+1 > game.World.Move[entity].MaximumYPosition - game.World.Draw[entity].SizeY/2){
        game.World.Move[entity].Direction[1] = game.World.Move[entity].Direction[1] * -1
    }

    let collide = game.World.Collide[entity];
    if (collide.Collisions.length > 0) {
        let collision = collide.Collisions[0];
        if (collision.Hit[0]) {
            transform.Translation[0] += collision.Hit[0];
            move.Direction[0] = -move.Direction[0];
        }
        if (collision.Hit[1]) {
            transform.Translation[1] += collision.Hit[1];
            move.Direction[1] = -move.Direction[1];
        }
        if (game.World.Mask[collision.Other.EntityId] & Has.MoveDirection) {
            let move = game.World.Move[collision.Other.EntityId];
            move.Direction[0] += move.Direction[0];
            move.Direction[1] += move.Direction[1];
        }
    }
}