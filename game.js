// 1) create classes
// 2) create function within classes
// 3) create element in DOM

class Game {
  start() {
    this.player = new Player(); // create a new instance of your class Player
    this.player.domElement = this.createDomElm(this.player); // create DOM element: HTML element of "player" for the UI
    this.drawDomElm(this.player);
    this.addEventListeners(); // detect arrow functions
  }

  addEventListeners() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.player.moveLeft();
      } else if (event.key === "ArrowRight") {
        this.player.moveRight();
      }
      this.drawDomElm(this.player);
    });
  }

  // creating this method allows us to have this element in the UI and then to access it in the html file
  createDomElm(instance) {
    const htmlTag = document.createElement("div");
    // create htmlTag
    htmlTag.className = instance.className;
    // add class (so that we can reuse this function to create different types of elements in the dom, eg. player, obstacles....)
    htmlTag.style.width = instance.width + "vw";
    htmlTag.style.height = instance.height + "vh";

    const board = document.getElementById("board");
    // get a reference to the parent container
    // get the element where the new htmlTag should be added to
    board.appendChild(htmlTag);
    // append the element to the dom

    return htmlTag;
  }

  drawDomElm(instance) {
    this.htmlTag.style.left = instance.positionX + "vw"; //wil change throughout game
    this.htmlTag.style.bottom = instance.positionY + "vh"; //wil change throughout game, each time we press key
  }
}

class Player {
  constructor() {
    this.className = "player";
    this.positionX = 0;
    this.positionY = 0;
    this.width = 10; // 10 % of board width
    this.height = 10;
    this.domElement = null;
  }

  moveLeft() {
    this.positionX -= 10;
    console.log("moving left - current position: " + this.positionX);
  }

  moveRight() {
    this.positionX += 10;
    console.log("moving right - current position: " + this.positionX);
  }
}

const game = new Game();
game.start();

// 3) create event logics
