const BOARD_X = 40;
const BOARD_Y = 20;
const MODULE_SIZE = 20;

class SnakeBody
{
    constructor()
    {
        this.model=document.createElement("canvas");
        this.ctx=ctx;
        this.canvas=canvas;
        this.bodyParts = 1;

        this.fillStyle = 'rgb(244,12,45)';
        ctx.fillRect(x,y,height,width);
    };
};

class SnakeGame{
    constructor() {
        this.game = document.createElement('canvas');
        this.game.width = BOARD_X * (MODULE_SIZE + 1) - 1;
        this.game.height = BOARD_Y * (MODULE_SIZE + 1) - 1;
    }
    build() {};
    render() {};
}

const snake = new SnakeGame();

window.addEventListener('DOMContentLoaded', () => document.body.appendChild(snake.game));



