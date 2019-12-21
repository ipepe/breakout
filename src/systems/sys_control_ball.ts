import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {Vec2} from "../math/index.js";

const QUERY = Has.Transform2D | Has.ControlBall;

export function sys_control_ball(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let direction = <Vec2>[
        Math.round((Math.random()*2000-1000)/1000),
        Math.round((Math.random()*2000-1000)/1000)
    ];
    let speed = 500;

    let transform = game.World.Transform2D[entity];
    transform.Translation[0] += direction[0] * speed * delta;
    transform.Translation[1] += direction[1] * speed * delta;

    if(transform.Translation[0] < 0){
        transform.Translation[0] = 0
    }
    if(transform.Translation[1] < 0){
        transform.Translation[1] = 0
    }

    if(transform.Translation[0] > game.ViewportHeight){
        transform.Translation[0] = 0
    }

    if(transform.Translation[1] > game.ViewportWidth){
        transform.Translation[1] = 0
    }


    transform.Dirty = true;
}