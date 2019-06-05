const BOARD_X = 40;
const BOARD_Y = 20;
const MODULE_SIZE = 20;

class Wall {
    constructor(gameCanvas) {
        this.game = gameCanvas.getContext('2d');
        this.model = document.createElement('canvas');
        this.model.width = MODULE_SIZE;
        this.model.height = MODULE_SIZE;
        this.hitModel = document.createElement('canvas');
        this.hitModel.width = MODULE_SIZE;
        this.hitModel.height = MODULE_SIZE;
        this.build(this.model);
        this.build(this.hitModel, '#a33');
    }
    build(model, color = 'grey') {
        const ctx = model.getContext('2d');
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.rect(0, 0, MODULE_SIZE, MODULE_SIZE);
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(4, 4, MODULE_SIZE - 8, MODULE_SIZE - 8);
        ctx.fill();
    }
    draw(x, y, hit = false) {
        if (hit) {
            this.game.drawImage(this.hitModel, x * (MODULE_SIZE + 1), y * (MODULE_SIZE + 1));
        } else {
            this.game.drawImage(this.model, x * (MODULE_SIZE + 1), y * (MODULE_SIZE + 1));
        }
    }
}

class Grid {
    constructor(gameCanvas, color) {
        this.game = gameCanvas.getContext('2d');
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
        this.game.drawImage(this.model, 0, 0);
    }
}

class SnakeBody {
    constructor(gameCanvas) {
        this.game = gameCanvas.getContext('2d');
        this.model = document.createElement("canvas");
        this.model.width = MODULE_SIZE;
        this.model.height = MODULE_SIZE;
        this.ctx = this.model.getContext('2d');
        this.build();
    }
    build() {
        this.ctx.lineWidth = 4;

        this.ctx.beginPath();
        this.ctx.rect(0, 0, MODULE_SIZE, MODULE_SIZE);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(MODULE_SIZE / 2, MODULE_SIZE / 2, MODULE_SIZE / 3, 0, Math.PI * 2);
        this.ctx.fill();
    }
    draw(x, y) {
        this.game.drawImage(this.model, x * (MODULE_SIZE + 1), y * (MODULE_SIZE + 1));
    }
}

class SnakeGame {
    constructor() {
        this.game = document.createElement('canvas');
        this.game.width = BOARD_X * (MODULE_SIZE + 1) - 1;
        this.game.height = BOARD_Y * (MODULE_SIZE + 1) - 1;
        this.snake = [{ x: 10, y: 10 }, { x: 11, y: 10 }, { x: 12, y: 10 }];
        this.walls = this.wallCoords;
        this.snakeModule = new SnakeBody(this.game);
        this.grid = new Grid(this.game, 'lightgray');
        this.wall = new Wall(this.game);
        this.gameEnded = false;
        this.moveDir = { x: 1, y: 0 };
        this.moveChange = null;
        window.addEventListener('keydown', ev => this.input(ev));
        this.render();
    }
    get wallCoords() {
        return new Array(20).fill(null).map(() =>
            new Object({ x: parseInt(Math.random() * (BOARD_X - 1)), y: parseInt(Math.random() * (BOARD_Y - 1)) })
        );
    }
    render() {
        if (this.moveChange) {
            this.moveDir = this.moveChange;
            this.moveChange = null;
        }
        this.move();
        this.grid.draw();
        this.walls.forEach(coord => this.wall.draw(coord.x, coord.y, coord.hit));
        this.snake.forEach(coord => this.snakeModule.draw(coord.x, coord.y));
        if (!this.gameEnded) setTimeout(() => this.render(), 100);
    }
    move() {
        const lastElem = this.snake[this.snake.length - 1];
        const newElem = { x: (lastElem.x + this.moveDir.x), y: (lastElem.y + this.moveDir.y) };
        if (newElem.x >= BOARD_X) newElem.x = 0;
        if (newElem.x < 0) newElem.x = BOARD_X - 1;
        if (newElem.y >= BOARD_Y) newElem.y = 0;
        if (newElem.y < 0) newElem.y = BOARD_Y - 1;
        this.gameEnded = this.collision(newElem);
        if (this.gameEnded) return;
        this.snake.shift();
        this.snake.push(newElem);
    }
    collision(newSnakePos) {
        for (let i = 0; i < this.walls.length; ++i) {
            if (newSnakePos.x == this.walls[i].x && newSnakePos.y == this.walls[i].y) {
                this.walls[i].hit = true;
                return true;
            }
        }
        return false;
    }
    input(ev) {
        switch (ev.key) {
            case 'ArrowUp':
                if (this.moveDir.y == 0) this.moveChange = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                if (this.moveDir.y == 0) this.moveChange = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                if (this.moveDir.x == 0) this.moveChange = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                if (this.moveDir.x == 0) this.moveChange = { x: 1, y: 0 };
                break;
        }
    }
}

const snake = new SnakeGame();

window.addEventListener('DOMContentLoaded', () => document.body.appendChild(snake.game));
