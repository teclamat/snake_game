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

function DrawBoard(){
    function DrawLine(x, y, d){
        ctx = snake.game.getContext('2d');
        this.d = d;
        ctx.strokeStyle = 'grey';
        ctx.moveTo(x, y);
        if (d==0) {
            ctx.lineTo(x, snake.game.height); 
        } else if (d==1) {
            ctx.lineTo(snake.game.width, y); 
        }
        ctx.lineWidth = 1; 
        ctx.stroke(); 
    }
    for(var x = MODULE_SIZE, y = 0; x < snake.game.width; x +=MODULE_SIZE){
        let direction = 0;
        DrawLine(x, y, direction); 
    }
    for(var x = 0, y = MODULE_SIZE; y < snake.game.height; y +=MODULE_SIZE){
        let direction = 1;
        DrawLine(x, y, direction); 
    }
}
DrawBoard();
