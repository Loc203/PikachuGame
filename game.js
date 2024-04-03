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
        const main__board__layer = document.querySelector(
          ".main__board__layer"
        );
        main__board__layer.style.opacity = "50%";
        main__board__layer.style.zIndex = 0;
        main__board__box.innerHTML = "";
        main__board__box.style.display = "none";
        this.renderMenuBoard();
      };
    });
  }
  getIndexLevel() {
    return this.level - 1;
  }
}

const gameClass = new Game();
gameClass.init();