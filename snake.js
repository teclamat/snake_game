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

this.x=Math.floor((Math.random()*800)+1);
this.y=Math.floor((Math.random()*420)+1);
    }
    build() {
        this.ctx.fillStyle = "#008000";
        this.ctx.rotate(45 * Math.PI / 180);
        this.ctx.fillRect(7,-7,MODULE_SIZE-6,MODULE_SIZE-6);
    }


    render(ctx) {
        ctx.drawImage(this.model, this.x, this.y);
    }
}

class GameBoard {
    constructor(gameCanvas, color) {
        this.gameContext = gameCanvas.getContext('2d');
        this.model = gameCanvas.cloneNode();
        this.ctx = this.model.getContext('2d');
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = 'white';
        this.build();
    }
    build() {
        this.ctx.fillRect(0, 0, this.model.width, this.model.height);

        for (let x = MODULE_SIZE + 1.5; x < this.model.width; x += MODULE_SIZE + 1) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.model.height);
        }

        for (let y = MODULE_SIZE + 1.5; y < this.model.height; y += MODULE_SIZE + 1) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.model.width, y);
        }

        this.ctx.stroke();
    }
    draw() {
        this.gameContext.drawImage(this.model, 0, 0);
    }
}

class SnakeGame{
    constructor() {
        this.game = document.createElement('canvas');
        this.game.width = BOARD_X * (MODULE_SIZE + 1) - 1;
        this.game.height = BOARD_Y * (MODULE_SIZE + 1) - 1;
        this.board = new GameBoard(this.game, 'lightgray');
        this.ctx = this.game.getContext("2d");
        this.food = new Food();
        this.render();
    }
    build() {};
    render() {
        this.board.draw();
        this.food.render(this.ctx);
    };
}

const snake = new SnakeGame();

window.addEventListener('DOMContentLoaded', () => document.body.appendChild(snake.game));
