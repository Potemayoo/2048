// 使用js变量而非css变量是因为后面会用到这些属性值，所以现在需要获取
const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

// TODO js类
export default class Grid {
    // NOTE 私有变量 在Grid外无法访问到cells
    #cells

    // TODO 复习constructor
    constructor(gridElement) {
        // NOTE setProperty
        gridElement.style.setProperty("--grid-size", GRID_SIZE);
        gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
        this.#cells = createCellElements(gridElement).map((cellElement, index) => {
            return new Cell(
                cellElement,
                index % GRID_SIZE,
                Math.floor(index / GRID_SIZE)
            )
        });
        // console.log(this.#cells);
    }

    get cellsByColumn() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y] = cell;
            return cellGrid;
        }, [])
    }

    // TODO getters private getter
    get #emptyCells() {
        // TODO filter
        return this.#cells.filter(cell => cell.tile == null);
    }
    // NOTE 写function randomEmptyCell()是错的 为什么？
    randomEmptyCell() {
        // TODO Math floor random方法
        const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
        return this.#emptyCells[randomIndex];
    }
}

class Cell {
    #cellElement;
    #x;
    #y;
    #tile;

    constructor(cellElement, x, y) {
        this.#cellElement = cellElement;
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get tile() {
        return this.#tile;
    }
    // TODO setter
    set tile(value) {
        this.#tile = value;
        if (value == null) return;
        this.#tile.x = this.#x;
        this.#tile.y = this.#y;
    }
}

function createCellElements(gridElement) {
    const cells = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        // TODO 整理DOM操作
        const cell = document.createElement("div");
        cell.classList.add("cell");
        gridElement.appendChild(cell);
        cells.push(cell);
    };
    return cells;
}
