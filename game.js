function section(board, col, row, value, firstActive) {
  let PieceWidth = 42;
  let PieceHeight = 52;
  let div = document.createElement("div");
  div.classList.add("section");
  div.image = document.createElement("img");
  div.setAttribute("col", col);
  div.setAttribute("row", row);
  div.setImage = function (imgIndex) {
    this.image.src = "images/section" + imgIndex + ".png";
    this.valueInMatrix = imgIndex;
  };
  if (col === firstActive?.col && row === firstActive?.row) {
    div.style.opacity = "50%";
  }

  if (value > 0) {
    div.style.cursor = "pointer";

    div.setImage(value);
  }
  div.appendChild(div.image);

  div.board = board;
  div.colIndex = col;
  div.rowIndex = row;

  div.style.position = "absolute";
  div.style.left = col * PieceWidth + "px";
  div.style.top = row * PieceHeight + "px";
  div.style.width = PieceWidth + "px";
  div.style.height = PieceHeight + "px";

  div.isVisible = true;

  div.setVisible = function (flag) {
    this.isVisible = flag;
    this.style.visibility = flag ? "visible" : "hidden";
  };

  div.setBorder = function (thick, color) {
    this.image.border = thick;
    this.image.style.borderColor = color;
  };

  div.setHightlight = function () {
    this.setBorder(1, "red");
  };

  div.setNormal = function () {
    this.setBorder(1, "#009933");
  };

  div.onmouseover = function () {
    this.setHightlight();
  };

  div.onmouseout = function () {
    this.setNormal();
  };
  div.onclick = () => {};

  div.setNormal();

  return div;
}

let firstActive = null;
let secondActive = null;

let timeInterval;

let levels = [
  {
    level: 1,
    title: "Bình thường",
    duration: 500,
    blood: 10,
  },
  {
    level: 2,
    title: "Thả xuống dưới",
    duration: 800,
    blood: 9,
  },
  {
    level: 3,
    title: "Thả lên trên",
    duration: 800,
    blood: 8,
  },
  {
    level: 4,
    title: "Thả qua trái",
    duration: 800,
    blood: 7,
  },
  {
    level: 5,
    title: "Thả qua phải",
    duration: 800,
    blood: 6,
  },
  {
    level: 6,
    title: "Tập trung giữa",
    duration: 900,
    blood: 5,
  },
];

class Game {
  arrImages;
  level = 1;
  score = 0;
  blood = 0;
  round = 1;
  duration;
  constructor(algorithms, section, draw) {
    this.algorithms = algorithms;
    this.section = section;
    this.draw = draw;
  }
  init() {
    this.renderMenuBoard();
  }
  renderMenuBoard() {
    const menuBoard = document.querySelector(".menu__board");
    const mainBoard = document.querySelector(".main__board");
    menuBoard.style.display = "block";
    mainBoard.style.display = "none";
    const start__btn = document.querySelector(".start__btn");
    start__btn.onclick = () => {
      this.score = 0;
      this.round = 1;
      this.renderMainBoard();
    };
  }
  renderMainBoard() {
    const menuBoard = document.querySelector(".menu__board");
    const mainBoard = document.querySelector(".main__board");
    menuBoard.style.display = "none";
    mainBoard.style.display = "block";
    this.reloadGame();
  }
  chooseRenderMenu() {
    const menu__btns = document.querySelectorAll(".menu__btn");
    menu__btns.forEach((btn) => {
      btn.onclick = () => {
        const main__board__box = document.querySelector(".main__board__box");
        const main__board__layer = document.querySelector(".main__board__layer");
        main__board__layer.style.opacity = "50%";
        main__board__layer.style.zIndex = 0;
        main__board__box.innerHTML = "";
        main__board__box.style.display = "none";
        this.renderMenuBoard();
        this.init();
      };
    });
  }
  getIndexLevel() {
    return this.level - 1;
  }
  reloadGame() {
    clearInterval(timeInterval);
    firstActive = null;
    this.arrImages = this.algorithms.getNewMatrix();
    this.blood = levels[this.getIndexLevel()].blood;
    this.duration = levels[this.getIndexLevel()].duration;
    this.loadImagesIcon();
    this.renderLevelOption();
    this.renderTitle();
    this.renderLevel();
    this.renderScore();
    this.renderBlood();
    this.renderTimeBar();
    this.renderRound();
    this.playAgain();
    this.chooseRepair();
    this.chooseHelp();
    this.hideHelp();
    this.chooseRenderMenu();
  }
  renderTimeBar() {
    const timeBar = document.querySelector(".time__bar");
    const timeText = document.querySelector(".time__text");
    timeBar.style.height = this.duration / 2 + "px";
    timeText.innerHTML = this.duration;
    timeInterval = setInterval(() => {
      this.duration--;
      if (this.duration === 0) {
        this.renderNoTime();
      }
      const timeBar = document.querySelector(".time__bar");
      const timeText = document.querySelector(".time__text");
      timeBar.style.height = this.duration / 2 + "px";
      timeText.innerHTML = this.duration;
    }, 1000);
  }
}

const gameClass = new Game(section);
gameClass.init();