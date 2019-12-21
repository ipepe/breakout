import {control_paddle} from "../components/com_control_paddle.js";
import {draw_rect} from "../components/com_draw.js";
import {Game} from "../game.js";
import {World} from "../world.js";
import {control_ball} from "../components/com_control_ball.js";

export function scene_main(game: Game) {
    game.World = new World();

    let worldWidth = game.ViewportWidth;
    let worldHeight = game.ViewportHeight;


    for(var i=1; i< 6; i++){
        for(var j=1; j<6; j++){
            game.Add({
                Translation: [game.ViewportWidth * i / 6, game.ViewportHeight * j / 12 ],
                Using: [
                    draw_rect(worldWidth/7, worldHeight/20, 'white')
                ],
            });
        }
    }

    // PADDLE
    game.Add({
        Translation: [game.ViewportWidth /2, game.ViewportHeight * 19/20],
        Using: [
            control_paddle(),
            draw_rect(worldWidth/3, worldHeight/15, 'white')
        ],
    });

    // BALL
    game.Add({
        Translation: [game.ViewportWidth / 2, game.ViewportHeight * 6/8],
        Using: [
            control_ball(),
            draw_rect(worldHeight/15, worldHeight/15, 'white')
        ],
    });
}
