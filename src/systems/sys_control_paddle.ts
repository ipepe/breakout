import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {Vec2} from "../math/index.js";

const QUERY = Has.Transform2D | Has.ControlPaddle;

export function sys_control_paddle(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let direction = <Vec2>[
        (game.InputState['ArrowRight'] || 0) - (game.InputState['ArrowLeft'] || 0),
        0
    ];
    let speed = 300;

    let transform = game.World.Transform2D[entity];
    transform.Translation[0] += direction[0] * speed * delta;
    transform.Translation[1] += direction[1] * speed * delta;

    if(transform.Translation[0] < game.ViewportWidth*2/10){
        transform.Translation[0] = game.ViewportWidth*2/10
    }
    if(transform.Translation[0] > game.ViewportWidth*8/10){
        transform.Translation[0] = game.ViewportWidth*8/10
    }

    transform.Dirty = true;
}
