import {control_paddle} from "../components/com_control_paddle.js";
import {draw_rect} from "../components/com_draw.js";
import {Game} from "../game.js";
import {World} from "../world.js";
import {control_ball} from "../components/com_control_ball.js";
import {move} from "../components/com_move.js"
import {Vec2} from "../math";
import {collide} from "../components/com_collide.js";

export function scene_main(game: Game) {
    game.World = new World();

    let worldWidth = game.ViewportWidth;
    let worldHeight = game.ViewportHeight;


    for(var i=1; i< 6; i++){
        for(var j=1; j<6; j++){
            game.Add({
                Translation: [game.ViewportWidth * i / 6, game.ViewportHeight * j / 12 ],
                Using: [
                    draw_rect(worldWidth/7, worldHeight/20),
                    collide([worldWidth/7, worldHeight/20])
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
            draw_rect(worldWidth/3, worldHeight/15),
            collide([worldWidth/3, worldHeight/15])
        ],
    });

    // BALL
    for(var i=0; i<3; i++){
        game.Add({
            Translation: [game.ViewportWidth / 2, game.ViewportHeight * 6 / 8],
            Using: [
                control_ball(),
                move(
                    <Vec2>[(Math.random()*2)-1, (Math.random()*2)-1],
                    500,
                    0, game.ViewportWidth,
                    0, game.ViewportHeight
                ),
                draw_rect(worldHeight/15, worldHeight/15),
                collide([worldHeight/15, worldHeight/15])
            ],
        });
    }
}
