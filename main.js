'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const carrots = document.querySelectorAll('.carrot');

let carrotsCounter = Number(gameScore.innerText);

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  console.log(`started value : ${started}`);

  started = !started;
  console.log(`started value : ${started}`);
});

popUpRefresh.addEventListener('click', () => {
  console.log('refresh btn clicked');
  if (started) {
    stopGame();
  } else {
    refreshGame();
  }
  started = !started;
});

function refreshGame() {
  hidePopUp();
  showStartButton();
  startGame();
  assignIdToIcons();
}

function hidePopUp() {
  popUp.classList.add('pop-up--hide');
}

function showStartButton() {
  const icon = gameBtn.querySelector('.fa-stop');
  icon.classList.add('fa-play');
  icon.classList.remove('fa-stop');
  gameBtn.style.visibility = 'visible';
}

function assignIdToIcons() {
  const carrots = document.querySelectorAll('.carrot');
  let carrotId = 0;

  carrots.forEach((carrot) => {
    carrot.id = `carrot${carrotId}`;
    carrotId++;
  });
}

function handleCarrotsAndBugsOnClick() {
  field.addEventListener('click', (e) => {
    console.log(e);
    console.log(e.target.id);

    if (e.target.className === 'bug') {
      stopGame();
    } else if (e.target.className === 'carrot') {
      let tmpCarrot = document.querySelector(`#${e.target.id}`);
      tmpCarrot.remove();
      carrotsCounter = Number(gameScore.innerText) - 1;
      gameScore.innerText = carrotsCounter;
    }

    checkCarrotsCount();
  });
}

function checkCarrotsCount() {
  const carrots = document.querySelectorAll('.carrot');

  if (carrots.length == 0) {
    console.log(`carrot is undefined`);
    stopGame();
  }
}

function wonGame() {
  stopGameTimer();
  hideGameButton();
  showPopUpWithText('YOU WON!');
  field.classList.add('cursor-block');
}

function startGame() {
  field.classList.remove('cursor-block');

  initGame();
  assignIdToIcons();
  showStopButton();
  showTimerAndScore();
  startGameTimer();

  handleCarrotsAndBugsOnClick();
}

function stopGame() {
  stopGameTimer();
  hideGameButton();
  showPopUpWithText('REPLAY?');
  field.classList.add('cursor-block');
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    console.log(`timer value: ${remainingTimeSec}`);
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      stopGame();
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.remove('pop-up--hide');
}

function initGame() {
  field.innerHTML = ``;
  gameScore.innerText = CARROT_COUNT;
  // 벌레와 당근을 생성한 뒤 field에 추가해줌
  console.log(fieldRect);
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    // item.style.transform = `translate(${x}px,${y}px)`;
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
