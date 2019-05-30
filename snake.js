const BOARD_X = 40;
const BOARD_Y = 20;
const MODULE_SIZE = 20;

class Food {
    constructor() {
        this.model = document.createElement('canvas');
        this.model.width = MODULE_SIZE;
        this.model.height = MODULE_SIZE;
        this.ctx = this.model.getContext('2d');
        this.build();
    }
    build() {
        this.ctx.fillStyle = "#008000";
        this.ctx.fillRect(0,0,MODULE_SIZE,MODULE_SIZE);

    }
    render(ctx) {
        //ctx.drawImage(this.model, 100, 150);
    }
}

class SnakeGame{
    constructor() {
        this.game = document.createElement('canvas');
        this.game.width = BOARD_X * (MODULE_SIZE + 1) - 1;
        this.game.height = BOARD_Y * (MODULE_SIZE + 1) - 1;
        this.ctx = this.game.getContext("2d");
        //this.food = new Food();
        this.render();
    }
    build() {};
    render() {
        this.food.render(this.ctx);
        requestAnimationFrame(render);
    };
}

const snake = new SnakeGame();

window.addEventListener('DOMContentLoaded', () => document.body.appendChild(snake.game)); 