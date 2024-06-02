//thuật toán game
class algorithms {
  constructor() {}
  // trả về 1 số ngẫu nhiên từ 0 đến n đưa vào
  getRandom(n) {
    return Math.round(Math.random() * (n - 1));
  }
  //tạo mảng dựa trên số lượng nhập vào, với mỗi cột được thêm sẽ là mảng rỗng
  newArray(col) {
    let a = new Array();
    for (let i = 0; i < col; i++) a[i] = new Array();
    return a;
  }
  //tọa độ xy của thẻ
    point(x, y) {
    return {
      x,
      y,
    };
  }
  //tạo ma trận với các giá trị thẻ ngẫu nhiên
  getNewMatrix() {
    let a = this.newArray(18);
    let i, j, k, t, remain, key;
    let stop;
    //thêm trước các giá trị 0 vào mảng
    for (i = 0; i < 18; i++) for (j = 0; j < 11; j++) a[i][j] = 0;
    //16x9 = 144 thẻ
    remain = 144;
    //vòng lặp gán thẻ vào vị trí ngẫu nhiên trong ma trận chạy từ thẻ thứ 1 đến thẻ 36
    for (k = 1; k <= 36; k++) {
      //mỗi thẻ sẽ được xuất hiện 4 lần
      for (t = 1; t <= 4; t++) {
        //vì getRandom lấy ngẫu nhiên từ 0 đến 143 (144-1)
        //nên +1 để kết quả đưa ra sẽ từ 1 đến 144
        key = this.getRandom(remain--) + 1;
        stop = false;
        //sử dụng vòng lặp để duyệt qua các phần tử 
        //cho đến khi đến phần tử thứ k tính từ gốc rồi gán giá trị đó = k 
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
  //kiểm tra xem toa độ đưa vào có nằm trong ma trận hay không
  myInside(i, j) {
    return i >= 0 && i < 18 && j >= 0 && j < 11;
  }
  //kiểm tra xem có đường đi giữa 2 ô không
  checkPath(a, i1, j1, i2, j2) {
    let moveX = new Array(0, 0, 1, -1);
    let moveY = new Array(1, -1, 0, 0);
    //kiểm tra
    // check vị trí 2 thẻ trùng nhau không
    if (i1 == i2 && j1 == j2) return null;
    //check 2 thẻ có phải rỗng không
    if (a[i1][j1] == 0 || a[i2][j2] == 0) return null;
    //check 2 thẻ có cùng giá trị k không
    if (a[i1][j1] != a[i2][j2]) return null;

    let fist, last, i, j, t;
    let queue = new Array();
    let box = this.newArray(18); // lưu trữ x tạm
    let count = this.newArray(18);// lưu trữ y tạm

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
    // tìm đường đi
    while (fist <= last) {
      i = queue[fist].x; // get x hiện tại
      j = queue[fist].y;  //get y hiện tại
      fist++;
      //kiểm tra các hướng
      for (t = 0; t < 4; t++) {
        canGo[t] = true;
        p[t] = i; //lưu x tạm
        q[t] = j; //lưu y tạm
      }
      do {
        for (t = 0; t < 4; t++)
          if (canGo[t]) {
            //tìm vị trí nếu di chuyển
            p[t] += moveX[t];
            q[t] += moveY[t];
            //kiểm tra xem tọa độ có nằm trong bảng hay không
            if (!this.myInside(p[t], q[t])) {
              canGo[t] = false;
              continue;
            }
            // xem đã đến điểm đích chưa
            //lưu thông tin ô
            if (p[t] == i2 && q[t] == j2) {
              box[p[t]][q[t]].x = i;
              box[p[t]][q[t]].y = j;
              return this.createArrayList(box, i2, j2);
            }
            //kiểm tra xem tọa độ tiếp theo có bị cản hay ko
            if (a[p[t]][q[t]] > 0) {
              canGo[t] = false;
              continue;
            }
            //kiểm tra xem thẻ kế đã được duyệt chưa
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
  // lưu danh sách đường đi
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
  //lấy 1 cột từ bảng 2 chiều
  getCol(arr, n) {
    return arr.map((x) => x[n]);
  }
  //tạo ra mảng mới với các giá trị bằng 0
  getNewArrZero() {
    const newArray = this.newArray(18);
    for (let i = 0; i < 18; i++) {
      for (let j = 0; j < 11; j++) {
        newArray[i][j] = 0;
      }
    }
    return newArray;
  }
  // xử lý game tại các lv khác nhau
  getLevelMatrix(arrayList, level) {
    switch (level) {
      case 1: {
        return arrayList;
      }
      // thẻ di chuyển xuống dưới
      case 2: {
        const newArray = this.getNewArrZero();
        //duyệt qua các hàng
        for (let i = 1; i < arrayList.length - 1; i++) {
          const arrHandle = arrayList[i];// lấy vị trí hàng hiện tại
          //duyệt qua các phần tử trong hàng
          for (let j = 1; j < arrHandle.length - 1; j++) {
            if (arrHandle[j] === 0) {
              arrHandle.splice(j, 1); //xóa phần tử tại vị trí rỗng
              arrHandle.unshift(0); // thêm 0 vào đầu hàng để đẩy các phần tử xuống
            }
          }
          //lưu hàng đã sửa đổi vào mảng mới
          for (let m = 0; m < arrHandle.length; m++) {
            newArray[i][m] = arrHandle[m];
          }
        }
        //trả về mảng đã chỉnh sửa
        return newArray;
      }
      //đẩy thẻ lên trên
      case 3: {
        const newArray = this.getNewArrZero();
        //duyệt qua các hàng
        for (let i = 1; i < arrayList.length - 1; i++) {
          const arrHandle = arrayList[i];
          let arrZero = [];
          //duyệt qua các phần tử trong hàng
          for (let j = 1; j < arrHandle.length - 1; j++) {
            if (arrHandle[j] === 0) {
              arrZero.push(j);
            }
          }
          //sử dụng arrZero để lưu trữ vị trí của thẻ
          //vì mảng được duyệt từ trên xuống nên nếu 2 thẻ cùng hàng thì chỉ xóa 1 ô đầu
          //ô thứ 2 đã được đẩy lên, vì thế khi duyệt dòng tiếp theo sẽ không tìm thấy ô trống
          for (let i = 0; i < arrZero.length; i++) {
            if (i === 0) {
              arrHandle.splice(arrZero[i], 1);
              arrHandle.push(0);
            } else {
              arrHandle.splice(arrZero[i] - 1, 1);
              arrHandle.push(0);
            }
          }
          //lưu hàng đã sửa đổi
          for (let m = 0; m < arrHandle.length; m++) {
            newArray[i][m] = arrHandle[m];
          }
        }
        //trả về mảng đã chỉnh sửa
        return newArray;
      }
      //đẩy thẻ sang trái
      case 4: {
        const newArray = this.getNewArrZero();
        //duyệt qua các dòng
        for (let i = 1; i < arrayList[0].length - 1; i++) {
          const arrHandle = this.getCol(arrayList, i);
          let arrZero = [];
          //duyệt qua các phần tử trong dòng
          for (let j = 1; j < arrHandle.length - 1; j++) {
            if (arrHandle[j] === 0) {
              arrZero.push(j);
            }
          }
          //sử dụng arrZero để lưu trữ vị trí của thẻ
          //vì mảng được duyệt từ trên xuống nên nếu 2 thẻ cùng dòng thì chỉ xóa 1 ô đầu
          //ô thứ 2 đã được đẩy lên, vì thế khi duyệt phần tử tiếp theo sẽ không tìm thấy ô trống
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
      //đẩy thẻ sang phải
      case 5: {
        const newArray = this.getNewArrZero();
        //duyệt qua các dòng
        for (let i = 1; i < arrayList[0].length - 1; i++) {
          const arrHandle = this.getCol(arrayList, i);
          let arrZero = [];
          //duyệt qua các phần tử trong dòng
          for (let j = 1; j < arrHandle.length - 1; j++) {
            if (arrHandle[j] === 0) {
              arrHandle.splice(j, 1);//xóa 1 phần tử có giá trị = 0
              arrHandle.unshift(0);//đẩy 0 vào đầu dòng
            }
          }
          for (let m = 0; m < arrHandle.length; m++) {
            newArray[m][i] = arrHandle[m];
          }
        }
        return newArray;
      }
      //đẩy các thẻ vào giữa
      case 6: {
        const newArray = this.getNewArrZero();
        //duyệt qua các phần tử trong hàng
        for (let i = 1; i < arrayList.length - 1; i++) {
          const arrHandle = arrayList[i];
          const center = arrHandle.length / 2; // chính giữa hàng
          let arrZeroSmall = [];//mảng chứa các phần tử bên trái
          let arrZeroBig = [];//các phần tử bên phải
          //duyệt qua các phần tử trong hàng
          for (let j = 1; j < arrHandle.length - 1; j++) {
            if (arrHandle[j] === 0) {
              if (j < center) {
                arrZeroSmall.push(j); //lưu các giá trị 0 ở phía trái
              } else {
                arrZeroBig.push(j); //lưu các giá trị 0 ở phía phải
              }
            }
          }
          //xóa các phần tử bằng 0 của mảng bên trái 
          //và thêm 0 để đẩy các phần tử qua phải
          for (let i = 0; i < arrZeroSmall.length; i++) {
            arrHandle.splice(arrZeroSmall[i], 1);
            arrHandle.unshift(0);
          }
          //xóa các phần tử bằng 0 của mảng bên phải 
          //và thêm 0 để đẩy các phần tử qua trái
          for (let i = 0; i < arrZeroBig.length; i++) {
            if (i === 0) {
              arrHandle.splice(arrZeroBig[i], 1);
              arrHandle.push(0);
            } else {
              arrHandle.splice(arrZeroBig[i] - 1, 1);
              arrHandle.push(0);
            }
          }
          //lưu mảng đã sửa sang mảng mới
          for (let m = 0; m < arrHandle.length; m++) {
            newArray[i][m] = arrHandle[m];
          }
        }
        //duyệt qua các cột
        for (let i = 1; i < newArray[0].length - 1; i++) {
          const arrHandle = this.getCol(newArray, i);
          const center = arrHandle.length / 2; //điểm chính giữa cột
          let arrZeroSmall = []; // lưu trữ mảng nửa trên
          let arrZeroBig = [];// lưu trữ mảng nửa dưới
          //duyệt qua các phần tử trong cột
          for (let j = 1; j < arrHandle.length - 1; j++) {
            if (arrHandle[j] === 0) {
              if (j < center) {
                arrZeroSmall.push(j); // lưu phần tử 0 ở mảng trên
              } else {
                arrZeroBig.push(j);// lưu phần tử 0 ở mảng dưới
              }
            }
          }
          //xóa các phần tử bằng 0 của mảng nửa trên 
          //và thêm 0 để đẩy các phần tử xuống dưới
          for (let i = 0; i < arrZeroSmall.length; i++) {
            arrHandle.splice(arrZeroSmall[i], 1);
            arrHandle.unshift(0);
          }
          //xóa các phần tử bằng 0 của mảng nửa dưới 
          //và thêm 0 để đẩy các phần tử lên trên
          for (let i = 0; i < arrZeroBig.length; i++) {
            if (i === 0) {
              arrHandle.splice(arrZeroBig[i], 1);
              arrHandle.push(0);
            } else {
              arrHandle.splice(arrZeroBig[i] - 1, 1);
              arrHandle.push(0);
            }
          }
          //lưu mảng sau khi chỉnh sửa
          for (let m = 0; m < arrHandle.length; m++) {
            newArray[m][i] = arrHandle[m];
          }
        }
        //trả về mảng đã chỉnh sửa
        return newArray;
      }
      default:
        return newArray;
    }
  }
  //duyệt hết các phần tử, rồi từ phần tử này
  //tìm đường đi các đường đi đến tất cả các phần tử khác bằng cách duyệt qua từng dòng cột
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
  // trộn các phần tử trong mảng
  mixArr(a, n) {
    let b = this.generate(n);
    let c = new Array();
    for (let i = 0; i < n; i++) c[i] = a[b[i]];
    for (let i = 0; i < n; i++) a[i] = c[i];
  }
  //hoán đổi vị trí các thẻ với nhau
  fixMatrix(a) {
    let b = new Array();
    let i, j, k = 0;
    //duyệt qua các phần tử, 
    //nếu không rỗng thì lưu vào b
    for (let i = 1; i <= 16; i++)
      for (let j = 1; j <= 9; j++) if (a[i][j] > 0) b[k++] = a[i][j];
    //thay đổi vị trí các thẻ trong mảng b
    this.mixArr(b, k);
    k = 0;
    //duyệt qua các phần tử
    //nếu không rỗng thì thay thế thẻ đó bằng thẻ đã trộn trong mảng b
    for (let i = 1; i <= 16; i++)
      for (let j = 1; j <= 9; j++) if (a[i][j] > 0) a[i][j] = b[k++];

    let tmp = this.newArray(18);
    for (let i = 0; i < 18; i++)
      for (let j = 0; j < 11; j++) tmp[i][j] = a[i][j] > 0 ? 1 : 0;
    //kiểm tra xem có đường đi không
    const checkPath = this.checkHavePath(a);
    //nếu không thì tiếp tục trộn
    if (!checkPath) {
      return this.fixMatrix(a);
    } else {
      return a;
    }
  }
  //duyệt xem các phần tử trong ma trận đã về 0 hết chưa
  checkFinishRound(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        count += arr[i][j];
      }
    }
    return count === 0;
  }
  //tạo ra mảng có giá trị ngẫu nhiên từ 0 đến n-1
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

const algoClass = new algorithms();
// Vẽ đường đi giữa 2 thẻ
class draw {
  constructor() {}
  //đưa vào 2 điểm
  getRectDraw(p1, p2) {
    var x1, y1, x2, y2;
    //so sánh tọa độ và gán cho các biến
    //tìm tọa độ có vị trí xa nhất so với gốc
    if (p1.x < p2.x) {
      x1 = p1.x;
      x2 = p2.x;
    } else {
      x2 = p1.x;
      x1 = p2.x;
    }
    if (p1.y < p2.y) {
      y1 = p1.y;
      y2 = p2.y;
    } else {
      y2 = p1.y;
      y1 = p2.y;
    }
    // trả về khoảng cách giữa 2 điểm
    return {
      x: x1 - 3,
      y: y1 - 3,
      //vd: a cách gốc 50px, b cách gốc 70px => 70-50 là khoảng cách từ a đến b
      width: x2 - x1 + 6,
      height: y2 - y1 + 6,
    };
  }
  //tìm tọa độ trung tâm của thẻ 
  //i,j là index của thẻ trong matrix
  //minh họa: mỗi thẻ chiếm diện tích x = 45, y = 55 thì điểm trung tâm thẻ thứ 3 dòng 1 
  //sẽ ở vị trí cách left 84px(tương đương với chiều ngang 2 thẻ) + 45px/2(1 nửa chiều ngang của thẻ), cách top 0px + 55/2px(1 nữa chiều dọc của thẻ)
  findCentre(i, j) {
    return {
      x: i * 45 + 45 / 2,
      y: j * 55 + 55 / 2,
    };
  }
}

const drawClass = new draw();
// Tạo khung cho game (các ô hình ảnh trong game)
function section(board, col, row, value, firstActive) {
  let PieceWidth = 45;
  let PieceHeight = 55;
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
  return div;
}

let firstActive = null;
let secondActive = null;

let timeInterval;

let levels = [
  {
    level: 1,
    blood: 10,
    duration: 500,
  },
  {
    level: 2,
    blood: 10,
    duration: 700,
  },
  {
    level: 3,
    blood: 10,
    duration: 700,
  },
  {
    level: 4,
    blood: 7,
    duration: 850,
  },
  {
    level: 5,
    blood: 7,
    duration: 850,
  },
  {
    level: 6,
    blood: 5,
    duration: 900,
  },
];
// Phần xử lý game
class Game {
  arrImages;
  level = 1;
  round = 1;
  duration;
  blood = 0;
  score = 0;
  constructor(algorithms, draw, section) {
    this.algorithms = algorithms;
    this.draw = draw;
    this.section = section;
  }
  //khởi tạo
  init() {
    this.renderMenuBoard();
  }
  //lấy sự kiện trang chủ khi nhấn vào nút bắt đầu
  renderMenuBoard() {
    const menuBoard = document.querySelector(".menu_board");
    const mainBoard = document.querySelector(".main_board");
    menuBoard.style.display = "block";
    mainBoard.style.display = "none";
    const start_btn = document.querySelector(".start_btn");
    start_btn.onclick = () => {
      this.score = 0;
      this.round = 1;
      this.level = 1;
      this.renderMainBoard();
    };
  }
  //chuyển sang giao diện trò chơi sau khi người dùng nhấn nút bắt đầu
  renderMainBoard() {
    const menuBoard = document.querySelector(".menu_board");
    const mainBoard = document.querySelector(".main_board");
    menuBoard.style.display = "none";
    mainBoard.style.display = "block";
    this.reloadGame();
  }
  //bắt sự kiện khi người dùng nhấn nút sẽ quay trở lại trang chủ sẽ khởi tạo lại toàn bộ
  chooseRenderMenu() {
    const menu_btns = document.querySelectorAll(".menu_btn");
    menu_btns.forEach((btn) => {
      btn.onclick = () => {
        const main_board_box = document.querySelector(".main_board_box");
        const main_board_layer = document.querySelector(".main_board_layer");
        main_board_layer.style.opacity = "50%";
        main_board_layer.style.zIndex = 0;
        main_board_box.innerHTML = "";
        main_board_box.style.display = "none";
        this.round = 1;
        this.score = 0;
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
    this.renderLevel();
    this.renderScore();
    this.renderBlood();
    this.renderTimeBar();
    this.renderRound();
    this.chooseRenderMenu();
    this.renderLevelOption();
    this.playAgain();
    this.chooseRepair();
    this.chooseHelp();
    this.hideHelp();
  }
  //hiển thị level
  renderLevel() {
    const current_level = document.querySelector(".current_level");
    current_level.innerHTML = levels[this.getIndexLevel()].level;
  }
  //hiển thị điểm
  renderScore() {
    const current_score = document.querySelector(".current_score");
    current_score.innerHTML = this.score;
  }
  //hiển thị máu còn lại
  renderBlood() {
    const current_blood = document.querySelector(".current_blood");
    current_blood.innerHTML = this.blood;
  }
  //hiển thị số lượng vòng chơi
  renderRound() {
    const current_round = document.querySelector(".current_round");
    current_round.innerHTML = this.round;
  }
  //khởi tạo thanh thời gian đếm ngược
  renderTimeBar() {
    const timeBar = document.querySelector(".time_bar");
    const timeText = document.querySelector(".time_text");
    timeBar.style.width = this.duration / 2 + "px";
    timeText.innerHTML = this.duration;
    //cứ mỗi 1 giây thời gian sẽ giảm đi 1 -> cho tới khi bằng 0 sẽ cho hiện getBox và tái tạo lại màn chơi
    timeInterval = setInterval(() => {
      this.duration--;
      if (this.duration === 0) {
        this.renderNoTime();
      }
      const timeBar = document.querySelector(".time_bar");
      const timeText = document.querySelector(".time_text");
      timeBar.style.width = this.duration / 2 + "px";
      timeText.innerHTML = this.duration;
    }, 1000);
  }
  //khởi tạo khung game 16x9
  loadImagesIcon() {
    const mainWrapEl = document.querySelector(".main_wrap_box");
    mainWrapEl.innerHTML = "";
    var div = document.createElement("div");
    div.classList.add("main_wrap_show");
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
    div.style.width = 45 * 18 + "px";
    div.style.height = 55 * 10 + "px";
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
                this.successSound();
                this.drawPath(getPath);
                firstActive = null;
                drawRectPath = setTimeout(() => {
                  this.score += levels[this.getIndexLevel()].level;
                  this.renderScore();
                  if (this.level !== 1) {
                    this.arrImages = this.algorithms.getLevelMatrix(
                      this.arrImages,
                      this.level
                    );
                  }
                  const checkHavePath = this.algorithms.checkHavePath(
                    this.arrImages
                  );
                  //kiểm tra xem các thẻ đã được xóa hết chưa
                  //khi hết màn sẽ tăng level thêm 1, kiểm tra level hiện tại nếu là lv6 sẽ trở về lv1.
                  if (this.algorithms.checkFinishRound(this.arrImages)) {
                    this.round++;
                    this.successSound();
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
                //nếu máu về 0 thì cho hiện getbox và khởi tạo lại màn chơi
                if (this.blood === 0) {
                  this.renderNoBlood();
                }
                this.renderBlood();
                this.failSound();
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
  drawPath(arrayList, help = false) {
    const mainWrapShowEl = document.querySelector(".main_wrap_show");
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
  // xử lí sounds
  successSound() {
    const success = document.querySelector(".success_sound");
    const fail = document.querySelector(".fail_sound");
    fail.pause();
    success.load();
    success.play();
  }
  // xử lí sounds
  failSound() {
    const fail = document.querySelector(".fail_sound");
    const success = document.querySelector(".success_sound");
    success.pause();
    fail.load();
    fail.play();
  }
  //lấy thông tin để gán vào getBox()
  renderInfoBox() {
    const box_lv = document.querySelector(".box_lv");
    const box_round = document.querySelector(".box_round");
    const box_score = document.querySelector(".box_score");
    box_lv.innerHTML = this.level;
    box_round.innerHTML = this.round;
    box_score.innerHTML = this.score;
  }
  renderNoBlood() {
    this.failSound();
    //Đây là 1 lớp layer, về cơ bản nó vẫn tồn tại nhưng bị đè bởi các lớp khác, 
    //khi thua nó sẽ được di chuyển lên để che đi các lớp khác,
    const main_board_box = document.querySelector(".main_board_box");
    const main_board_layer = document.querySelector(".main_board_layer");
    main_board_layer.style.opacity = "80%";
    main_board_layer.style.zIndex = 2;
    main_board_box.style.display = "flex";
    //=============
    clearInterval(timeInterval);
    main_board_box.innerHTML = getBox("Hết máu");
    this.renderInfoBox();
    this.chooseRenderMenu();
    this.playAgain();
  }
  renderNoTime() {
    this.failSound();
    //Đây là 1 lớp layer, về cơ bản nó vẫn tồn tại nhưng bị đè bởi các lớp khác, 
    //khi thua nó sẽ được di chuyển lên để che đi các lớp khác,
    const main_board_box = document.querySelector(".main_board_box");
    const main_board_layer = document.querySelector(".main_board_layer");
    main_board_layer.style.opacity = "80%";
    main_board_layer.style.zIndex = 2;
    main_board_box.style.display = "flex";
    //=============
    clearInterval(timeInterval);
    main_board_box.innerHTML = getBox("Hết thời gian");
    this.renderInfoBox();
    this.chooseRenderMenu();
    this.playAgain();
  }
  //tạo ra các inner để hiển thị options level
  renderLevelOption() {
    const selectEl = document.querySelector(".level_select");
    selectEl.innerHTML = "";
    for (let i = 0; i < levels.length; i++) {
      const optionEl = document.createElement("option");
      // *1 vì giá trị levels[i].level được hiểu như 1 string
      // vì thế *1 để chuyển đổi thành số
      if (levels[i].level * 1 == this.level) {
        optionEl.setAttribute("selected", true);
      }
      optionEl.value = levels[i].level * 1;
      optionEl.innerHTML = "Màn " + levels[i].level;
      selectEl.append(optionEl);
    }
    this.onChangeLevel();
  }
  //bắt sự kiện sau khi người dùng nhấn chọn đổi level
  //chuyển đổi màn hình game sang level đó
  onChangeLevel() {
    const selectEl = document.querySelector(".level_select");
    selectEl.onchange = (e) => {
      this.level = e.target.value * 1;
      // console.log(this.level);
      this.score = 0; 
      this.reloadGame();
    };
  }
  //người dùng nhấn nút chơi lại, bắt sự kiện để khởi tạo lại toàn bộ thẻ game
  playAgain(){
    const playBtns = document.querySelectorAll(".again_btn");
    playBtns.forEach((btn) => {
      btn.onclick = () => {
        const main_board_box = document.querySelector(".main_board_box");
        const main_board_layer = document.querySelector(".main_board_layer");
        main_board_layer.style.opacity = "50%";
        main_board_layer.style.zIndex = 0;
        main_board_box.innerHTML = "";
        main_board_box.style.display = "none";
        this.round = this.round;
        this.score = 0;
        this.reloadGame();
      };
    });
  }
  //khi người dùng nhấn nút này thì sẽ hoán đổi các vị trí của thẻ
  // sử dụng thuật toán fixMatrix đã được viết từ trước
  chooseRepair(){
    const repairBtn = document.querySelector(".fix_btn");
    repairBtn.onclick = () => {
      if (this.blood > 1) {
        this.blood--;
        this.renderBlood();
        this.arrImages = this.algorithms.fixMatrix(this.arrImages);
        this.loadImagesIcon();
        this.successSound();
      } else {
        this.failSound();
      } 
    };
  }
  //Khi người dùng nhấn nút trợ giúp thì sẽ hiện lên đường đi hợp lệ
  //sử dụng thuật toán drawPath đã được viết từ trước
  //với mỗi lần sử dụng trợ giúp sẽ bị trừ 1 máu,nếu máu = 1 không thể sử dụng trợ giúp
  chooseHelp(){
    const help_btn = document.querySelector(".help_btn");
    help_btn.onclick = () => {
      if (this.blood > 1) {
        this.blood--;
        this.renderBlood();
        const findPath = this.algorithms.checkHavePath(this.arrImages);
        this.drawPath(findPath, true);
        this.successSound();
      } else {
        this.failSound();
      }
    };
  }
  //nút trợ giúp ẩn, giúp tìm đường đi mà không bị mất máu
  hideHelp(){
    addEventListener("keydown", (event) => {
      if (event.key === "z" ) {
        const findPath = this.algorithms.checkHavePath(this.arrImages);
        this.drawPath(findPath, true);
        // console.log('test event')
      }
    });
  }
}
//box hiên ra khi người dùng hết thời gian hoặc hết máu
function getBox(title) {
  // return `<div class="box_wrap">
  //   <h5>${title}</h5>
  //   <p>Cấp độ: <span class="box_lv"></span></p>
  //   <p>Vòng: <span class="box_round"></span></p>
  //   <p>Điểm đạt được: <span class="box_score"></span></p>
  //   <div class="box_btn">
  //     <button class="again_btn">Chơi lại</button>
  //     <button class="menu_btn">Trang chủ</button>
  //   </div>
  // </div>`;
  return `
  <div class="modal fade show" tabindex="-1" style = "display: block; z-index: 2; top: 50%; left: 50%; transform: translate(-50%, -50%);">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5>${title}</h5>
      </div>
      <div class="modal-body">
      <p><Strong>Cấp độ: </Strong><span class="box_lv"></span></p>
      <p><Strong>Vòng: </Strong><span class="box_round"></span></p>
      <p><Strong>Điểm đạt được: </Strong><span class="box_score"></span></p>
      </div>
      <div class="modal-footer">
      <button class="again_btn">Chơi lại</button>
      <button class="menu_btn">Trang chủ</button>
      </div>
    </div>
  </div>
</div>
  `;
}
const gameClass = new Game(algoClass, drawClass, section);
gameClass.init();