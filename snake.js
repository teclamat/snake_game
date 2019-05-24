const BOARD_X = 40;
const BOARD_Y = 20;
const MODULE_SIZE = 20;

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


class GameBoard{
    constructor(xdim, ydim, fsize, context) {
        this.FieldSize = fsize;
        this.BoardWidth = xdim*(fsize+1)-1;
        this.BoardHeight = ydim*(fsize+1)-1;
        this.ctx = context;
    }
    DrawLine(x, y, d){
        const ctx = this.ctx;
        this.d = d;
        ctx.strokeStyle = 'grey';
        ctx.moveTo(x, y);
        if (d == 0) {
            ctx.lineTo(x, this.BoardHeight);
        } else if (d == 1) {
            ctx.lineTo(this.BoardWidth, y);
        }
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    DrawBoard(){
        for (var x = this.FieldSize, y = 0; x < this.BoardWidth; x += this.FieldSize) {
            let direction = 0;
            this.DrawLine(x, y, direction);
        }
        for (var x = 0, y = this.FieldSize; y < this.BoardHeight; y += this.FieldSize) {
            let direction = 1;
            this.DrawLine(x, y, direction);
        }
    }
}

const board = new GameBoard(BOARD_X, BOARD_Y, MODULE_SIZE, snake.game.getContext('2d'));
board.DrawBoard();
