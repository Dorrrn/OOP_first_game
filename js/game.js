class Game {
  constructor() {
    this.obstaclesArr = [];
    this.timer = 0;
  }
  start() {
    // create player
    this.player = new Player(); //create an instance of the Player
    this.player.domElement = this.createDomElm(this.player); //create DOM element for the player
    this.drawDomElm(this.player);

    this.addEventListeners();

    setInterval(() => {
      this.timer++;
      // 0,3,6,9,... -->true // 1,2,4,5,7,... -->false
      if (this.timer % 3 === 0) {
        // create obstacle
        const newObstacle = new Obstacle();
        this.obstaclesArr.push(newObstacle);
        newObstacle.domElement = this.createDomElm(newObstacle);
        this.drawDomElm(newObstacle);
      }
      //move all obstacles in obstaclesArr
      this.obstaclesArr.forEach((elm) => {
        elm.moveDown();
        this.drawDomElm(elm);
        this.collision(this.player, elm);
      });
    }, 500);
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

  createDomElm(instance) {
    const htmlTag = document.createElement("div"); // create html element (not added to the dom yet)
    htmlTag.className = instance.className; // add class (so that we can reuse this function to create different types of elements in the dom, eg. player, obstacles....)
    htmlTag.style.width = instance.width + "vw";
    htmlTag.style.height = instance.height + "vh";
    const board = document.getElementById("board"); // get a reference to the parent container
    board.appendChild(htmlTag); // append the element to the dom
    return htmlTag;
  }
  drawDomElm(instance) {
    instance.domElement.style.left = instance.positionX + "vw";
    instance.domElement.style.bottom = instance.positionY + "vh";
  }

  collision(instance1, instance2) {
    if (
      instance1.positionX < instance2.positionX + instance2.width &&
      instance1.positionY < instance2.positionY + instance2.height &&
      
      instance2.positionX < instance1.positionX + instance1.width &&
      instance2.positionY < instance1.positionY + instance1.height
    ) {
      console.log("game over");
      document.querySelector(".player").style.backgroundColor = "black";
    }
  }
}

class Player {
  constructor() {
    this.className = "player";
    this.positionX = 0;
    this.positionY = 0;
    this.width = 10;
    this.height = 10;
    this.domElement = null;
  }
  moveLeft() {
    this.positionX -= 10;
    console.log("moving left.... current poistion: " + this.positionX);
  }
  moveRight() {
    this.positionX += 10;
    console.log("moving right.... current poistion: " + this.positionX);
  }
}

class Obstacle {
  constructor() {
    this.className = "obstacle";
    this.positionX = Math.random() * 100; //Math.random() * (max - min) + min
    this.positionY = 100;
    this.width = 10;
    this.height = 10;
    this.domElement = null;
  }
  moveDown() {
    this.positionY -= 10;
    //console.log("moving down.... current poistion: " + this.positionX);
  }
}

const game = new Game();
game.start();
