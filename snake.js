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
    render() {

        for( let i = 0; i < snake.length ; i++){
            this.ctx.fillStyle = ( i == 0 )? "green" : "white";
            this.ctx.fillRect(snake[i].x,snake[i].y,box,box);
          
            this.ctx.strokeStyle = "color";
            this.ctx.strokeRect(snake[i].x,snake[i].y,box,box);
        }
      
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(food.x,food.y,box,box);

}

const snake = new SnakeGame();

window.addEventListener('DOMContentLoaded', () => document.body.appendChild(snake.game));
