// --background-lightness:80%;
// --text-lightness:20%;

export default class Tile {

    #tileElement
    #x
    #y
    #value

    constructor(tileContainer, value = Math.random() > .5 ? 2 : 4){
        this.#tileElement = document.createElement("div");
        this.#tileElement.classList.add("tile");
        // TODO append和apendChild
        tileContainer.append(this.#tileElement);
        this.value = value;
    }

    // NOTE 基于某个值的变化而改变另一个值，使用getters和setters
    set value(v){
        this.#value = v;
        // NOTE textContent
        this.#tileElement.textContent = v;
        // TODO Math.log2()
        const power = Math.log2(v);
        const backgroundLightness = 100 - power * 9;
        this.#tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`);
        this.#tileElement.style.setProperty("--text-lightness", `${backgroundLightness <= 50 ? 90 : 10}%`);
    }

    set x(value){
        this.#x = value;
        this.#tileElement.style.setProperty("--x", value);
    }
    
    set y(value){
        this.#y = value;
        this.#tileElement.style.setProperty("--y", value);
    }
}