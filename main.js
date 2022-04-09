// 당근과 벌레들을 각 다섯개씩 게임 필드 랜덤한 포지션에 나타나게 한다.
const playBtn = document.querySelector('.game__button');
const gameField = document.querySelector('.game__field');
const fieldLeft = gameField.getBoundingClientRect().left;
const fieldRight = gameField.getBoundingClientRect().right;
const fieldTop = gameField.getBoundingClientRect().top;
const fieldBottom = gameField.getBoundingClientRect().bottom;
let carrotImgBox = [];
let carrotCoorX = [];
let carrotCoorY = [];
let bugImgBox = [];
let bugCoorX = [];
let bugCoorY = [];
let totalImgBox = [];
console.log(`${fieldLeft}, ${fieldRight}, ${fieldTop}, ${fieldBottom}`);
function init() {
  for (let i = 0; i < 5; i++) {
    // 1-1. 당근 랜덤 좌표 값 생성하기
    let carrotX;
    let carrotY;
    while (1) {
      carrotX = Math.floor(Math.random() * fieldLeft);
      carrotY = Math.floor(Math.random() * fieldTop);
      if (
        fieldLeft < carrotX < fieldRight &&
        fieldTop < carrotY < fieldBottom
      ) {
        console.log(`carrot x: ${carrotX}, y:${carrotY}`);
        break;
      }
    }
    // 1-2. 벌레 랜덤 좌표 값 생성하기
    let bugX;
    let bugY;
    while (1) {
      bugX = Math.floor(Math.random() * fieldLeft);
      bugY = Math.floor(Math.random() * fieldTop);
      if (fieldLeft < bugX < fieldRight && fieldTop < bugY < fieldBottom) {
        console.log(`bug x: ${bugX}, y:${bugY}`);
        break;
      }
    }

    // 2. `` 기호로 innerHTML 이용해 img 파일 랜덤 좌표에 심기
    carrotImgBox[i] = `<img src="img/carrot.png"  alt="carrot" class="carrot">`;
    carrotCoorX[i] = carrotX;
    carrotCoorY[i] = carrotY;

    bugImgBox[i] = `<img src="img/bug.png"  alt="carrot" class="bug">`;
    bugCoorX[i] = bugX;
    bugCoorY[i] = bugY;
  }
  console.log(carrotImgBox);
  console.log(carrotCoorX);
  console.log(carrotCoorY);
  console.log('==============');
  console.log(bugImgBox);
  console.log(bugCoorX);
  console.log(bugCoorY);
  totalImgBox = carrotImgBox.concat(bugImgBox);
  console.log(totalImgBox);
  gameField.innerHTML = totalImgBox;
  const carrots = document.querySelectorAll('.carrot');
  for (let i = 0; i < 5; i++) {
    carrots[
      i
    ].style.transform = `translate(${carrotCoorX[i]}px,${carrotCoorY[i]}px)`;
  }
  const bugs = document.querySelectorAll('.bug');
  for (let i = 0; i < 5; i++) {
    bugs[i].style.transform = `translate(${bugCoorX[i]}px,${bugCoorY[i]}px)`;
  }
}

init();

// // 1. 랜덤 좌표 값 생성하기
// let x;
// let y;
// while (1) {
//   x = Math.floor(Math.random() * fieldLeft);
//   y = Math.floor(Math.random() * fieldTop);
//   if (fieldLeft < x < fieldRight && fieldTop < y < fieldBottom) {
//     console.log(`x: ${x}, y:${y}`);
//     break;
//   }
// }
// // 2. `` 기호로 innerHTML 이용해 img 파일 랜덤 좌표에 심기
// gameField.innerHTML = `<img src="img/carrot.png"  alt="carrot" class="carrot">`;
// const carrot = document.querySelector('.carrot');
// console.log(carrot);
// carrot.style.transform = `translate(${x}px,${y}px)`;
