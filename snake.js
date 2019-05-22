const BOARD_X = 40;
const BOARD_Y = 20;
const MODULE_SIZE = 20;

class SnakeGame{
    constructor() {
        this.game = document.createElement('canvas');
        this.game.width = (BOARD_X + 1) * MODULE_SIZE - 1;
        this.game.height = (BOARD_Y + 1) * MODULE_SIZE - 1;
    }
    build() {};
    render() { };
}

const snake = new SnakeGame();

window.addEventListener('DOMContentLoaded', () => document.body.appendChild(snake.game));