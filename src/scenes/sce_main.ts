import {control_paddle} from "../components/com_control_paddle.js";
import {draw_rect} from "../components/com_draw.js";
import {Game} from "../game.js";
import {World} from "../world.js";
import {control_ball} from "../components/com_control_ball.js";
import {move} from "../components/com_move.js"
import {Vec2} from "../math";

export function scene_main(game: Game) {
    game.World = new World();

    let worldWidth = game.ViewportWidth;
    let worldHeight = game.ViewportHeight;


    for(var i=1; i< 6; i++){
        for(var j=1; j<6; j++){
            game.Add({
                Translation: [game.ViewportWidth * i / 6, game.ViewportHeight * j / 12 ],
                Using: [
                    draw_rect(worldWidth/7, worldHeight/20)
                ],
            });
        }
    }

    // PADDLE
    game.Add({
        Translation: [game.ViewportWidth /2, game.ViewportHeight * 19/20],
        Using: [
            control_paddle(),
            move(
                <Vec2>[0, 0],
                300,
                0, game.ViewportWidth,
                0, game.ViewportHeight
            ),
            draw_rect(worldWidth/3, worldHeight/15)
        ],
    });

    // BALL
    game.Add({
        Translation: [game.ViewportWidth / 2, game.ViewportHeight * 6/8],
        Using: [
            control_ball(),
            move(
                <Vec2>[0,1],
                300,
                0, game.ViewportWidth,
                0, game.ViewportHeight
            ),
            draw_rect(worldHeight/15, worldHeight/15)
        ],
    });
}
