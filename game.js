//thuật toán game
class algorithms {
  constructor() {}
  getRandom(n) {
    return Math.round(Math.random() * (n - 1));
  }
  newArray(col) {
    let a = new Array();
    for (let i = 0; i < col; i++) a[i] = new Array();
    return a;
  }

  point(x, y) {
    return {
      x,
      y,
    };
  }

  getNewMatrix() {
    let a = this.newArray(18);
    let i, j, k, t, remain, key;
    let stop;

    for (i = 0; i < 18; i++) for (j = 0; j < 11; j++) a[i][j] = 0;
    remain = 144;
    for (k = 1; k <= 36; k++) {
      for (t = 1; t <= 4; t++) {
        key = this.getRandom(remain--) + 1;
        stop = false;
        for (i = 1; i <= 16; i++) {
          if (stop) break;
          else
            for (j = 1; j <= 9; j++)
              if (a[i][j] == 0) {
                key--;
                if (key == 0) {
                  stop = true;
                  a[i][j] = k;
                  break;
                }
              }
        }
      }
    }
    return a;
  }

  checkPath(a, i1, j1, i2, j2) {
    let UU = new Array(0, 0, 1, -1);
    let VV = new Array(1, -1, 0, 0);
    if (i1 == i2 && j1 == j2) return null;
    if (a[i1][j1] == 0 || a[i2][j2] == 0) return null;
    if (a[i1][j1] != a[i2][j2]) return null;

    let fist, last, i, j, t;
    let queue = new Array();
    let box = this.newArray(18);
    let count = this.newArray(18);

    for (i = 0; i < 198; i++) queue[i] = this.point(0, 0);
    fist = 0;
    last = 0;
    queue[0].x = i1;
    queue[0].y = j1;
    for (i = 0; i < 18; i++)
      for (j = 0; j < 11; j++) box[i][j] = this.point(-1, -1);
    box[i1][j1].x = -2;
    count[i1][j1] = 0;

    let canGo = new Array();
    let p = new Array();
    let q = new Array();

    while (fist <= last) {
      i = queue[fist].x;
      j = queue[fist].y;
      fist++;
      for (t = 0; t < 4; t++) {
        canGo[t] = true;
        p[t] = i;
        q[t] = j;
      }
      do {
        for (t = 0; t < 4; t++)
          if (canGo[t]) {
            p[t] += UU[t];
            q[t] += VV[t];
            if (!this.myInside(p[t], q[t])) {
              canGo[t] = false;
              continue;
            }
            if (p[t] == i2 && q[t] == j2) {
              box[p[t]][q[t]].x = i;
              box[p[t]][q[t]].y = j;
              return this.createArrayList(box, i2, j2);
            }
            if (a[p[t]][q[t]] > 0) {
              canGo[t] = false;
              continue;
            }
            if (box[p[t]][q[t]].x != -1) continue;
            if (count[i][j] == 2) continue;
            last++;
            queue[last].x = p[t];
            queue[last].y = q[t];
            box[p[t]][q[t]].x = i;
            box[p[t]][q[t]].y = j;
            count[p[t]][q[t]] = count[i][j] + 1;
          }
      } while (canGo[0] || canGo[1] || canGo[2] || canGo[3]);
    }
    return null;
  }

  myInside(i, j) {
    return i >= 0 && i < 18 && j >= 0 && j < 11;
  }
  createArrayList(box, i, j) {
    let arrayList = new Array();
    let p, q;
    do {
      arrayList.push(this.point(i, j));
      p = box[i][j].x;
      q = box[i][j].y;
      i = p;
      j = q;
    } while (i != -2);
    return arrayList;
  }
  getCol(arr, n) {
    return arr.map((x) => x[n]);
  }
  getNewArrZero() {
    const newArray = this.newArray(18);
    for (let i = 0; i < 18; i++) {
      for (let j = 0; j < 11; j++) {
        newArray[i][j] = 0;
      }
    }
    return newArray;
  }
  getLevelMatrix(arrayList, level) {
    switch (level) {
      case 1: {
        return arrayList;
      }
      case 2: {
        const newArray = this.getNewArrZero();
        for (let i = 1; i < arrayList.length - 1; i++) {
          const arrHandle = arrayList[i];
          let arrZero = [];
          for (let j = 1; j < arrHandle.length - 1; j++) {
            if (arrHandle[j] === 0) {
              arrZero.push(j);
            }
          }
          for (let i = 0; i < arrZero.length; i++) {
            arrHandle.splice(arrZero[i], 1);
            arrHandle.unshift(0);
          }
          for (let m = 0; m < arrHandle.length; m++) {
            newArray[i][m] = arrHandle[m];
          }
        }
        return newArray;
      }
      case 3: {
        const newArray = this.getNewArrZero();
        for (let i = 1; i < arrayList.length - 1; i++) {
          const arrHandle = arrayList[i];
          let arrZero = [];
          for (let j = 1; j < arrHandle.length - 1; j++) {
            if (arrHandle[j] === 0) {
              arrZero.push(j);
            }
          }

          for (let i = 0; i < arrZero.length; i++) {
            if (i === 0) {
              arrHandle.splice(arrZero[i], 1);
              arrHandle.push(0);
            } else {
              arrHandle.splice(arrZero[i] - 1, 1);
              arrHandle.push(0);
            }
          }
          for (let m = 0; m < arrHandle.length; m++) {
            newArray[i][m] = arrHandle[m];
          }
        }
        return newArray;
      }
      case 4: {
        const newArray = this.getNewArrZero();
        for (let i = 1; i < arrayList[0].length - 1; i++) {
          const arrHandle = this.getCol(arrayList, i);
          let arrZero = [];
          for (let j = 1; j < arrHandle.length - 1; j++) {
            if (arrHandle[j] === 0) {
              arrZero.push(j);
            }
          }

          for (let i = 0; i < arrZero.length; i++) {
            if (i === 0) {
              arrHandle.splice(arrZero[i], 1);
              arrHandle.push(0);
            } else {
              arrHandle.splice(arrZero[i] - 1, 1);
              arrHandle.push(0);
            }
          }
          for (let m = 0; m < arrHandle.length; m++) {
            newArray[m][i] = arrHandle[m];
          }
        }
        return newArray;
      }
      case 5: {
        const newArray = this.getNewArrZero();
        for (let i = 1; i < arrayList[0].length - 1; i++) {
          const arrHandle = this.getCol(arrayList, i);
          let arrZero = [];
          for (let j = 1; j < arrHandle.length - 1; j++) {
            if (arrHandle[j] === 0) {
              arrZero.push(j);
            }
          }

          for (let i = 0; i < arrZero.length; i++) {
            arrHandle.splice(arrZero[i], 1);
            arrHandle.unshift(0);
          }
          for (let m = 0; m < arrHandle.length; m++) {
            newArray[m][i] = arrHandle[m];
          }
        }
        return newArray;
      }
      case 6: {
        const newArray = this.getNewArrZero();
        for (let i = 1; i < arrayList.length - 1; i++) {
          const arrHandle = arrayList[i];
          const center = arrHandle.length / 2;
          let arrZeroSmall = [];
          let arrZeroBig = [];
          for (let j = 1; j < arrHandle.length - 1; j++) {
            if (arrHandle[j] === 0) {
              if (j < center) {
                arrZeroSmall.push(j);
              } else {
                arrZeroBig.push(j);
              }
            }
          }
          for (let i = 0; i < arrZeroSmall.length; i++) {
            arrHandle.splice(arrZeroSmall[i], 1);
            arrHandle.unshift(0);
          }
          for (let i = 0; i < arrZeroBig.length; i++) {
            if (i === 0) {
              arrHandle.splice(arrZeroBig[i], 1);
              arrHandle.push(0);
            } else {
              arrHandle.splice(arrZeroBig[i] - 1, 1);
              arrHandle.push(0);
            }
          }
          for (let m = 0; m < arrHandle.length; m++) {
            newArray[i][m] = arrHandle[m];
          }
        }
        for (let i = 1; i < newArray[0].length - 1; i++) {
          const arrHandle = this.getCol(newArray, i);
          const center = arrHandle.length / 2;
          let arrZeroSmall = [];
          let arrZeroBig = [];
          for (let j = 1; j < arrHandle.length - 1; j++) {
            if (arrHandle[j] === 0) {
              if (j < center) {
                arrZeroSmall.push(j);
              } else {
                arrZeroBig.push(j);
              }
            }
          }
          for (let i = 0; i < arrZeroSmall.length; i++) {
            arrHandle.splice(arrZeroSmall[i], 1);
            arrHandle.unshift(0);
          }
          for (let i = 0; i < arrZeroBig.length; i++) {
            if (i === 0) {
              arrHandle.splice(arrZeroBig[i], 1);
              arrHandle.push(0);
            } else {
              arrHandle.splice(arrZeroBig[i] - 1, 1);
              arrHandle.push(0);
            }
          }
          for (let m = 0; m < arrHandle.length; m++) {
            newArray[m][i] = arrHandle[m];
          }
        }
        return newArray;
      }
      default:
        return newArray;
    }
  }
  checkHavePath(arr) {
    let finalPath = null;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        for (let m = 0; m < arr.length; m++) {
          for (let n = 0; n < arr[m].length; n++) {
            finalPath = this.checkPath(arr, i, j, m, n);
            if (finalPath) return finalPath;
          }
        }
      }
    }
    return null;
  }
  fixMatrix(a) {
    let b = new Array();
    let i,
      j,
      k = 0;
    for (let i = 1; i <= 16; i++)
      for (let j = 1; j <= 9; j++) if (a[i][j] > 0) b[k++] = a[i][j];
    this.mixArr(b, k);
    k = 0;
    for (let i = 1; i <= 16; i++)
      for (let j = 1; j <= 9; j++) if (a[i][j] > 0) a[i][j] = b[k++];

    let tmp = this.newArray(18);
    for (let i = 0; i < 18; i++)
      for (let j = 0; j < 11; j++) tmp[i][j] = a[i][j] > 0 ? 1 : 0;
    const checkPath = this.checkHavePath(a);
    if (!checkPath) {
      return this.fixMatrix(a);
    } else {
      return a;
    }
  }
  checkFinishRound(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        count += arr[i][j];
      }
    }
    return count === 0;
  }
  mixArr(a, n) {
    let b = this.generate(n);
    let c = new Array();
    for (let i = 0; i < n; i++) c[i] = a[b[i]];
    for (let i = 0; i < n; i++) a[i] = c[i];
  }
  generate(n) {
    let a = new Array();
    let i, j, k, t;
    for (i = 0; i < n; i++) a[i] = n;
    j = n;
    for (i = 0; i < n; i++) {
      k = this.getRandom(j--) + 1;
      t = 0;
      while (k > 0) {
        if (a[t++] == n) k--;
      }
      a[t - 1] = i;
    }
    return a;
  }
}

const algorithmsClass = new algorithms();

// Tạo khung cho game (các ô hình ảnh trong game)
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
// Phần xử lý game
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
  //khởi tạo
  init() {
    this.renderMenuBoard();
  }
  //lấy sự kiện trang chủ khi nhấn vào nút bắt đầu
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
  //chuyển sang giao diện trò chơi khi người dùng nhấn nút bắt đầu
  renderMainBoard() {
    const menuBoard = document.querySelector(".menu__board");
    const mainBoard = document.querySelector(".main__board");
    menuBoard.style.display = "none";
    mainBoard.style.display = "block";
    this.reloadGame();
  }
  //bắt sự kiện khi người dùng nhấn nút sẽ quay trở lại trang chủ sẽ khởi tạo lại toàn bộ
  chooseRenderMenu() {
    const menu__btns = document.querySelectorAll(".menu__btn");
    menu__btns.forEach((btn) => {
      btn.onclick = () => {
        this.renderMenuBoard();
      };
    });
  }
  //lấy vị trí của level trong mảng levels
  getIndexLevel() {
    return this.level - 1;
  }
  //khởi tạo giao diện game
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
  //hiển thị tên chế độ chơi
  renderTitle() {
    const titleEl = document.querySelector(".level__title");
    titleEl.innerHTML = levels[this.getIndexLevel()].title;
  }
  //hiển thị level
  renderLevel() {
    const current__level = document.querySelector(".current__level");
    current__level.innerHTML = levels[this.getIndexLevel()].level;
  }
  //hiển thị điểm
  renderScore() {
    const current__score = document.querySelector(".current__score");
    current__score.innerHTML = this.score;
  }
  //hiển thị máu còn lại
  renderBlood() {
    const current__blood = document.querySelector(".current__blood");
    current__blood.innerHTML = this.blood;
  }
  //hiển thị số lượng vòng chơi
  renderRound() {
    const current__round = document.querySelector(".current__round");
    current__round.innerHTML = this.round;
  }
  //khởi tạo thanh thời gian đếm ngược
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
  //khởi tạo khung game 16x9
  loadImagesIcon() {
    const mainWrapEl = document.querySelector(".main__wrap__box");
    mainWrapEl.innerHTML = "";
    var div = document.createElement("div");
    div.classList.add("main__wrap__show");
    div.arrPiece = this.algorithms.newArray(17);
    for (var i = 1; i <= 16; i++) {
      for (var j = 1; j <= 9; j++) {
        div.arrPiece[i][j] = this.section(
          div,
          i,
          j,
          this.arrImages[i][j],
          firstActive,
          secondActive
        );
        div.appendChild(div.arrPiece[i][j]);
      }
    }
    div.style.position = "relative";
    div.style.width = 42 * 18 + "px";
    div.style.height = 52 * 10 + "px";
    mainWrapEl.append(div);
    this.clickSection();
  }
  //bắt sự kiện khi người dùng nhấn chọn thẻ
  clickSection() {
    const sectionAll = document.querySelectorAll(".section");
    sectionAll.forEach((section) => {
      const col = section.getAttribute("col") * 1;
      const row = section.getAttribute("row") * 1;
      if (this.arrImages[col][row]) {
        //sự kiện nhấn vào thẻ
        section.onclick = () => {
          //sự kiện khi người dùng nhấn vào thẻ nếu thẻ đó đã được chọn thì hủy chọn
          if (firstActive) {
            if (firstActive?.col === col && firstActive?.row === row) {
              firstActive = null;
              this.loadImagesIcon();
              //ngược lại nếu thẻ vừa chọn không phải là thẻ đã được chọn trước đó thì sẽ tìm đường đi
              } else {
              const getPath = this.algorithms.checkPath(
                this.arrImages,
                firstActive.col,
                firstActive.row,
                col,
                row
              );
              //nếu getPath=true thì thẻ chọn đầu tiên và thẻ thứ 2 sẽ bị xoá
              if (getPath) {
                this.arrImages[firstActive.col][firstActive.row] = 0;
                this.arrImages[col][row] = 0;
                this.playSuccessSound();
                this.drawPath(getPath);
                firstActive = null;
                drawRectPath = setTimeout(() => {
                  this.score += levels[this.getIndexLevel()].level;
                  this.renderScore();
                  if (this.level !== 1) {
                    this.arrImages = this.algorithms.getIndexLevelMatrix(
                      this.arrImages,
                      this.level
                    );
                  }
                  const checkHavePath = this.algorithms.checkHavePath(
                    this.arrImages
                  );
                  //khi hết màn sẽ kiểm tra level hiện tại và cộng 1, nếu là lv6 sẽ trở về lv1.
                  if (this.algorithms.checkFinishRound(this.arrImages)) {
                    this.round++;
                    if (this.level === 6) {
                      this.level = 1;
                    } else {
                      this.level++;
                    }
                    this.reloadGame();
                  } else {
                    //kiểm tra nếu không có đường đi nào thì sẽ di chuyển vị trí của các thẻ
                    if (!checkHavePath) {
                      this.arrImages = this.algorithms.fixMatrix(
                        this.arrImages
                      );
                    }
                  }
                  this.loadImagesIcon();
                }, 500);
                //trường hợp nếu giữa 2 thẻ không có đường đi thì trừ máu
              } else {
                this.blood--;
                //nếu màu về 0 thì khởi tạo lại màn chơi
                if (this.blood === 0) {
                  this.renderNoBlood();
                }
                this.renderBlood();
                this.playFailSound();
                firstActive = null;
                this.loadImagesIcon();
              }
            }
          } else {
            firstActive = {
              col,
              row,
            };
            this.loadImagesIcon();
          }
        };
      }
    });
  }
  //vẽ đường đi từ thẻ này sang  thẻ khác
  DrawPath(arrayList, help = false) {
    const mainWrapShowEl = document.querySelector(".main__wrap__show");
    let point1 = arrayList[0];
    let point2;
    let centre1, centre2;
    let i, rectDraw;
    for (i = 1; i < arrayList.length; i++) {
      const divPath = document.createElement("div");
      point2 = arrayList[i];
      centre1 = this.draw.findCentre(point1.x, point1.y);
      centre2 = this.draw.findCentre(point2.x, point2.y);
      rectDraw = this.draw.getRectDraw(centre1, centre2);
      divPath.style.left = rectDraw.x + "px";
      divPath.style.top = rectDraw.y + "px";
      divPath.style.width = rectDraw.width + "px";
      divPath.style.height = rectDraw.height + "px";
      divPath.style.position = "absolute";
      divPath.style.backgroundColor = help ? "red" : "#fff";
      divPath.style.pointerEvents = "none";
      mainWrapShowEl.append(divPath);
      point1 = point2;
    }
  }
  playSuccessSound() {
    const successEl = document.querySelector(".success__sound");
    const failEl = document.querySelector(".fail__sound");
    failEl.pause();
    successEl.load();
    successEl.play();
  }
  playFailSound() {
    const failEl = document.querySelector(".fail__sound");
    const successEl = document.querySelector(".success__sound");
    successEl.pause();
    failEl.load();
    failEl.play();
  }
  renderInfoBox() {
    const box__lv = document.querySelector(".box__lv");
    const box__round = document.querySelector(".box__round");
    const box__score = document.querySelector(".box__score");
    box__lv.innerHTML = this.level;
    box__round.innerHTML = this.round;
    box__score.innerHTML = this.score;
  }
  renderNoBlood() {
    const main__board__box = document.querySelector(".main__board__box");
    const main__board__layer = document.querySelector(".main__board__layer");
    main__board__layer.style.opacity = "80%";
    main__board__layer.style.zIndex = 2;
    main__board__box.style.display = "flex";
    clearInterval(timeInterval);
    main__board__box.innerHTML = getBox("Bạn đã hết lượt chơi");
    this.renderInfoBox();
    this.playAgain();
    this.chooseRenderMenu();
  }
  renderNoTime() {
    this.playFailSound();
    const main__board__box = document.querySelector(".main__board__box");
    const main__board__layer = document.querySelector(".main__board__layer");
    main__board__layer.style.opacity = "80%";
    main__board__layer.style.zIndex = 2;
    main__board__box.style.display = "flex";
    clearInterval(timeInterval);
    main__board__box.innerHTML = getBox("Bạn đã hết thời gian");
    this.renderInfoBox();
    this.playAgain();
    this.chooseRenderMenu();
  }
}
//box hiên ra khi người dùng hết thời gian hoặc hết máu
function getBox(title) {
  return `<div class="box__wrap">
    <h5>${title}</h5>
    <p>Cấp độ: <span class="box__lv"></span></p>
    <p>Vòng: <span class="box__round"></span></p>
    <p>Điểm đạt được: <span class="box__score"></span></p>
    <div class="box__btn">
      <button class="again__btn">Chơi lại</button>
      <button class="menu__btn">Trang chủ</button>
    </div>
  </div>`;
}
const gameClass = new Game(algorithmsClass, section);
gameClass.init();