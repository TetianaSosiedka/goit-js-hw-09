const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};
let timerId = null;
let buttonDisabled = 'disabled';

refs.buttonStart.addEventListener('click', onChangeColor);
refs.buttonStop.addEventListener('click', onStopChangeColor);

//-------------------------------------------------------------
function onChangeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.buttonStart.toggleAttribute('disabled');
  if (refs.buttonStop.hasAttribute('disabled')) {
    refs.buttonStop.toggleAttribute('disabled');
  }
}
function onStopChangeColor() {
  clearInterval(timerId);
  refs.buttonStop.toggleAttribute('disabled');
  if (refs.buttonStart.hasAttribute('disabled')) {
    refs.buttonStart.toggleAttribute('disabled');
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
