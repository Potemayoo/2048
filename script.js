import Grid from "./Grid.js";
import Tile from "./Tile.js";

const gameBoard = document.getElementById("game-board");

const grid = new Grid(gameBoard);
console.log(grid.randomEmptyCell())

grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);

setupInput();

// 只执行一次，执行完成后tile自动移动位置，等待新tile生成，全部动画执行完毕后，才能开始下一次事件
// TODO 事件监听
function setupInput() {
    window.addEventListener("keydown", handleInput, { once: true })
}

function handleInput(e) {
    // NOTE 获取键盘key
    console.log(e.key);
    // TODO switch
    switch (e.key) {
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        default:
            // 没有输入的时候，等待下一次输入
            setupInput();
            return
    }
    // 按下任意键后，等待下次输入
    setupInput();
}

function moveUp(){
    slideTiles(grid.cellsByColumn)
}
