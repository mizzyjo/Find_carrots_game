const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const IMG_SIZE = 80;

console.log(fieldRect);

function gameInit(classname, itemNumber, src) {
  const x1 = fieldRect.x;
  const x2 = x1 + fieldRect.width - IMG_SIZE;
  const y1 = fieldRect.y;
  const y2 = y1 + fieldRect.height - IMG_SIZE;
  console.log(`${x1}, ${x2}, ${y1}, ${y2}`);
  for (let i = 0; i < itemNumber; i++) {
    const fixedX = randomNumber(x1, x2);
    const fixedY = randomNumber(y1, y2);
    console.log(`fixed: ${fixedX}, ${fixedY}`);
    const item = document.createElement('img');
    item.setAttribute('class', classname);
    item.setAttribute('src', src);
    item.style.position = 'absolute';
    // item.style.transform = `translate(${fixedX}px,${fixedY}px)`;
    item.style.left = `${fixedX}px`;
    item.style.top = `${fixedY}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

gameInit('carrot', 5, 'img/carrot.png');
gameInit('bug', 5, 'img/bug.png');
