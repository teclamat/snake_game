const BOARD_X = 40;
const BOARD_Y = 20;
const MODULE_SIZE = 20;

class Wall {
    constructor(gameCanvas) {
        this.game = gameCanvas.getContext('2d');
        this.model = document.createElement('canvas');
        this.ctx = this.model.getContext('2d');
        this.model.width = MODULE_SIZE;
        this.model.height = MODULE_SIZE;
        this.build();
    }
    build() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(0, 0, MODULE_SIZE, MODULE_SIZE);
    }
    draw(x, y) {
        this.game.drawImage(this.model, x * (MODULE_SIZE + 1), y * (MODULE_SIZE + 1));
    }
}

class Grid {
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

        for (let x = MODULE_SIZE + 0.5; x < this.model.width; x += MODULE_SIZE + 1) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.model.height);
        }

        for (let y = MODULE_SIZE + 0.5; y < this.model.height; y += MODULE_SIZE + 1) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.model.width, y);
        }

        this.ctx.stroke();
    }
    draw() {
        this.gameContext.drawImage(this.model, 0, 0);
    }
}

class SnakeGame {
    constructor() {
        this.game = document.createElement('canvas');
        this.game.width = BOARD_X * (MODULE_SIZE + 1) - 1;
        this.game.height = BOARD_Y * (MODULE_SIZE + 1) - 1;
        this.grid = new Grid(this.game, 'lightgray');
        this.wall = new Wall(this.game);
        this.render();
    }
    build() { };
    render() {
        this.grid.draw();
        this.wall.draw(5, 6);
    };
}

const snake = new SnakeGame();

window.addEventListener('DOMContentLoaded', () => document.body.appendChild(snake.game));
