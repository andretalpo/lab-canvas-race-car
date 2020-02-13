class CanvasField {
  constructor(width, height) {
    this.canvas = document.createElement('canvas');
    this.width = width;
    this.height = height;
    this.ctx;
  }

  createField = () => {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');
    let board = document.getElementById("game-board");
    board.insertBefore(this.canvas, board.childNodes[0]);
  };

  drawSpeedway = () => {
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = 'gray';
    this.ctx.fillRect(30, 0, this.width - 60, this.height);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(40, 0, 10, this.height);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.width - 40 - 10, 0, 10, this.height);

    this.ctx.strokeStyle = 'white';
    this.ctx.beginPath();
    this.ctx.setLineDash([20, 25]);
    this.ctx.lineWidth = 5;
    this.ctx.moveTo(this.width / 2, 0);
    this.ctx.lineTo(this.width / 2, this.height);
    this.ctx.stroke();
    this.ctx.closePath();
  };

  clearCanvas = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
}

class Car {
  constructor(x, y, speed, ctx) {
    this.image;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.ctx = ctx;
  }

  createImage = () => {
    this.image = new Image();
    this.image.src = './images/car.png';
    this.image.onload = () => {
      this.drawCar();
    };
  };

  drawCar = () => {
    this.ctx.drawImage(this.image, this.x, this.y, 30, 50);
  };

  move = (key) => {
    if (key === 39) {
      this.x += this.speed;
    } else if (key === 37) {
      this.x -= this.speed;
    }
  };

}

class Obstacle {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed;
  }
}

class Game {
  constructor(canvas, car, obstacles) {
    this.canvas = canvas;
    this.car = car;
    this.obstacles = obstacles;
  }

  start = () => {
    this.createObstacles();
    this.animationCallback();
  }

  animationCallback = () => {
    this.canvas.clearCanvas();
    this.canvas.drawSpeedway();
    this.car.drawCar();
    console.log("ta rodando")
    const animation = window.requestAnimationFrame(this.animationCallback);
  }

  createObstacles = () => {
    //refazer tudo
    var x = myGameArea.canvas.width;
    var minHeight = 20;
    var maxHeight = 200;
    var height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    var minGap = 50;
    var maxGap = 200;
    var gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new Component(10, height, "green", x, 0));
    myObstacles.push(
      new Component(10, x - height - gap, "green", x, height + gap)
    );
  };

}

window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  function startGame() {
    const canvas = new CanvasField(420, 510);
    canvas.createField();
    const car = new Car(canvas.width / 2 - 15, canvas.height - 60, 1, canvas.ctx);
    car.createImage();


    window.onkeydown = (e) => {
      car.move(e.keyCode);
    }

    const game = new Game(canvas, car);
    game.start();
  }
};
