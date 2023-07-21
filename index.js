const rootEl = document.querySelector('html');
const timeEl = document.querySelector('.pomodoro__timer-time');
const controlEl = document.querySelector('.pomodoro__timer-control');
const startEl = document.querySelector('[data-control="start"]');
const pomodoroEl = document.querySelector('.pomodoro');
const shortBreakEl = document.querySelector('.shortBreak');
const longBreakEl = document.querySelector('.longBreak');
const settingsIconEl = document.querySelector('.settings__icon');
const settingsEl = document.querySelector('.settings');
const overlay = document.querySelector('.overlay');
const closeIconEl = document.querySelector('.close-icon');
const colorEl = document.querySelectorAll('.color');
const fontEl = document.querySelectorAll('.font');
const pomodoroInput = document.getElementById('pomodoroInput');
const shortBreakInput = document.getElementById('shortBreakInput');
const longBreakInput = document.getElementById('longBreakInput');
const applyEl = document.getElementById('apply');

// Timer options
let timeScheme = {
  pomodoroTime: 1200,
  shortBreakTime: 300,
  longBreakTime: 600,
};

let pomodoroTime = timeScheme.pomodoroTime;
let shortBreakTime = timeScheme.shortBreakTime;
let longBreakTime = timeScheme.longBreakTime;

let time = pomodoroTime;
let currentTimer = 'pomodoro';

///////////////////
// Local Storage

if (localStorage.getItem('timers')) {
  const timers = JSON.parse(localStorage.getItem('timers'));

  pomodoroTime = timers.pomodoroTime;
  shortBreakTime = timers.shortBreakTime;
  longBreakTime = timers.longBreakTime;

  time = pomodoroTime;
  currentTimer = 'pomodoro';
}

///////////////////
// Modal

const openModal = () => {
  overlay.classList.remove('hidden');
  settingsEl.classList.remove('hidden');
};

const closeModal = () => {
  overlay.classList.add('hidden');
  settingsEl.classList.add('hidden');
};

settingsIconEl.addEventListener('click', openModal);
closeIconEl.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//////////////////////
// Color Change Handler

colorEl.forEach((color) => {
  color.addEventListener('click', (e) => {
    switch (e.target.dataset.color) {
      case '1':
        rootEl.style.setProperty('--color-primary-bg', 'hsl(0, 91%, 71%)');
        break;
      case '2':
        rootEl.style.setProperty('--color-primary-bg', 'hsl(182, 91%, 71%)');
        break;
      case '3':
        rootEl.style.setProperty('--color-primary-bg', 'hsl(284, 89%, 74%)');
        break;
    }
  });
});

/////////////////////
// Font Change Handler
fontEl.forEach((font) => {
  font.addEventListener('click', (e) => {
    console.log(e.target.dataset.font);
    switch (e.target.dataset.font) {
      case '1':
        rootEl.style.setProperty('--ff-primary', 'Kumbh Sans, sans-serif');
        break;
      case '2':
        rootEl.style.setProperty('--ff-primary', 'Roboto Slab, serif');
        break;
      case '3':
        rootEl.style.setProperty('--ff-primary', 'Space Mono, monospace');
        break;
    }
  });
});

////////////////////
// Appply Settings Hander
applyEl.addEventListener('click', () => {
  pomodoroTime = +pomodoroInput.value * 60;
  shortBreakTime = +shortBreakInput.value * 60;
  longBreakTime = +longBreakInput.value * 60;
  time = pomodoroTime;

  localStorage.setItem(
    'timers',
    JSON.stringify({
      pomodoroTime: pomodoroTime,
      shortBreakTime: shortBreakTime,
      longBreakTime: longBreakTime,
    })
  );

  updateTimerDisplay();
  closeModal();
});

///////////////////
// Timer

// set timer text
startEl.textContent = 'start';

//Format timer display
function updateTimerDisplay() {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');

  const seconds = (time % 60).toString().padStart(2, '0');

  timeEl.textContent = `${minutes}:${seconds}`;
}

// Timer
function timerHandler() {
  updateTimerDisplay();

  // if (time === 0) {
  //   if (currentTimer === 'pomodoro') {
  //     pomodoroEl.classList.remove('active');
  //     shortBreakEl.classList.add('active');
  //     currentTimer = 'shortBreak';
  //     time = shortBreakTime;
  //   } else if (currentTimer === 'shortBreak') {
  //     pomodoroEl.classList.add('active');
  //     shortBreakEl.classList.remove('active');
  //     currentTimer = 'pomodoro';
  //     time = pomodoroTime;
  //   } else if (currentTimer === 'longBreak') {
  //     currentTimer = 'pomodoro';
  //     time = shortBreakTime;
  //   }
  // }
  if (time === 0) return;

  time--;
}

function startTimer() {
  console.log('clicked');
  timerInterval = setInterval(timerHandler, 1000);
  controlEl.textContent = 'pause';
  controlEl.dataset.control = 'pause';
}

function stopTimer() {
  controlEl.textContent = 'start';
  controlEl.dataset.control = 'start';
  clearInterval(timerInterval);
}

startEl.addEventListener('click', startTimer);

updateTimerDisplay();
