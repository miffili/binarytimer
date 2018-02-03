const timerDisplay = document.querySelector('.timer-display');
const toggleButton = document.querySelector('.toggle-timer');
const resetButton = document.querySelector('.reset-timer');

const maxTime = 35999;

let runningTimer;
let timerStatus = false;


function displayTime(decSeconds) {
  const minutes = Math.floor(decSeconds / 600);
  const restDecSecs = (decSeconds % 600)
  const seconds = Math.floor(restDecSecs / 10);
  const deciSeconds = restDecSecs % 10;

  const displayMins = `${minutes < 10 ? '0' : ''}${minutes}`;
  const displaySecs = `${seconds < 10 ? '0' : ''}${seconds}`;
  const displayDecSecs = `${deciSeconds}`;

  const display = `${displayMins}:${displaySecs}.${displayDecSecs}`;

  timerDisplay.textContent = display;

  displayBinary('mt', (Math.floor(minutes / 10)));
  displayBinary('mo', (minutes % 10));
  displayBinary('st', (Math.floor(seconds / 10)));
  displayBinary('so', (seconds % 10));
  displayBinary('d', deciSeconds);
};


function runTimer() {
  clearInterval(runningTimer);
  let timer = 0;

  // start interval
  runningTimer = setInterval(() => {

    const runTimer = timer++;

    // if time is up (reached max of 59min59sec) stop timer
    if(runTimer > maxTime) {
      clearInterval(runningTimer);
      return;
    }

    // display timer
    displayTime(timer);

  }, 100);
};


function displayBinary(type, digit) {

  for (let i = 8; i >= 1; i = i/2) {

    let binary = Math.floor( digit / i);

    binary ?
    document.getElementById(`${type}${i}`).classList.add('active') :
    document.getElementById(`${type}${i}`).classList.remove('active');

    digit = digit % i;
  }
};


function toggleTimer() {
  // stops timer
  if (timerStatus) {
    toggleButton.textContent = 'Start';
    toggleButton.setAttribute('disabled', true);

    // stop running timer
    clearInterval(runningTimer);

  // starts timer
  } else if (!timerStatus){

    runTimer();
    toggleButton.textContent = 'Stop';
  }

  timerStatus = !timerStatus;
};


function resetTimer() {
  toggleButton.textContent = 'Start';
  toggleButton.removeAttribute('disabled');
  timerStatus = false;
  displayTime(0);
  clearInterval(runningTimer);
};


toggleButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
