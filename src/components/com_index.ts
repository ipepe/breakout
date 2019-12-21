const enum Component {
    Collide,
    ControlPaddle,
    Draw,
    Transform2D,
    ControlBall,
    MoveDirection
}

export const enum Has {
    Collide = 1 << Component.Collide,
    ControlPaddle = 1 << Component.ControlPaddle,
    ControlBall = 1 << Component.ControlBall,
    Draw = 1 << Component.Draw,
    MoveDirection = 1 << Component.MoveDirection,
    Transform2D = 1 << Component.Transform2D,
}
