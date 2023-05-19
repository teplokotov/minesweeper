// Styles
// import '../pages/index.css';

import { drawPage, body } from "../components/page.js";

drawPage();

// Theme
const themes = document.querySelectorAll('.form__theme');
// Level
const levels = document.querySelectorAll('.form__level');
const levelHeading = document.querySelector('.field-size');
// Mines
const slider = document.querySelector('.form__slider');
const minesHeading = document.querySelector('.mines');
// Sounds
const sounds = document.querySelectorAll('.form__sounds');
// Name
const name = document.querySelector('#userName');
// Clicks
const clicks = document.querySelector('.score__view');
// Time
const time = document.querySelector('.time__view');
// Flags
const flags = document.querySelector('.flags__view');
// Field
const field = document.querySelector('.field');
// Button 'New Game'
const btnSet = document.querySelector('.btn-set');
// Banner
const banner = document.querySelector('.banner');
const bannerIcon = document.querySelector('.banner__icon');
const bannerText = document.querySelector('.banner__text');
const message = {
  lose: {
    icon: '🔥',
    text: 'Game over. Try again',
  },
  win: {
    icon: '🎉',
    text: 'Hooray! You found all mines in # seconds and N moves!',
  }
};

const levelsParam = {
  easy: {
    pins: 10,
    width: '400px',
    pinSize: '40px',
    fontSize: '100%',
  },
  normal: {
    pins: 15,
    width: '450px',
    pinSize: '30px',
    fontSize: '100%',
  },
  hard: {
    pins: 25,
    width: '450px',
    pinSize: '18px',
    fontSize: '80%',
  },
};

let config = {
  level: 'easy',
  mines: 10,
  theme: 'light',
  sounds: 'on',
  name: '',
  clicks: 0,
  time: 0,
  flags: 10,
  isMinesSetted: false,
  isFinish: false,
  isStart: false,
  isWin: false,
};

let gameTimer = null;
let mines = [];
let numbers = [];
const colors = ['#006bb1', '#008300', '#d2bd00', '#e86400', '#c10001', '#730001', '#8156c1', '#008f30'];
let playSoundClick = () => new Audio('./vendor/sounds/click.mp3').play();
let playSoundSetFlag = () => new Audio('./vendor/sounds/sflag.mp3').play();
let playSoundRemoveFlag = () => new Audio('./vendor/sounds/rflag.mp3').play();
let playSoundWin = () => new Audio('./vendor/sounds/win.mp3').play();
let playSoundBoom = () => new Audio('./vendor/sounds/boom.mp3').play();

getConfig();
applyConfig();
createField();

themes.forEach(radio => {
  radio.addEventListener('change', (evt) => {
    body.classList.toggle('theme_dark');
    body.classList.toggle('theme_light');
    config.theme = radio.value;
    saveConfig();
  });
});

levels.forEach(radio => {
  radio.addEventListener('change', () => {
    config.level = radio.value;
    const pins = levelsParam[config.level].pins;
    levelHeading.textContent = pins + 'x' + pins;
    saveConfig();
  });
});

slider.addEventListener('input', (evt) => {
  config.mines = evt.target.value;
  minesHeading.textContent = config.mines;
  saveConfig();
});

sounds.forEach(radio => {
  radio.addEventListener('change', () => {
    config.sounds = radio.value;
    saveConfig();
  });
});

name.addEventListener('input', (evt) => {
  config.name = evt.target.value;
  saveConfig();
});

btnSet.addEventListener('click', () => {
  removeField();
  createField();
});

function saveConfig() {
  localStorage.setItem('config', JSON.stringify(config));
}

function getConfig() {
  const configFromStorage = JSON.parse(localStorage.getItem('config'));
  if (configFromStorage) config = configFromStorage;
}

function applyConfig() {
  // apply Level
  levels.forEach(radio => {
    if(radio.value === config.level) {
      radio.checked = true;
      const pins = levelsParam[config.level].pins;
      levelHeading.textContent = pins + 'x' + pins;
    }
  });
  // apply Slider
  slider.value = config.mines;
  minesHeading.textContent = config.mines;
  // apply Theme
  themes.forEach(radio => {
    if(radio.value === config.theme) {
      body.classList.remove('theme_dark');
      body.classList.remove('theme_light');
      body.classList.add(`theme_${config.theme}`);
      radio.checked = true;
    }
  });
  // apply Sounds
  sounds.forEach(radio => {
    if(radio.value === config.sounds) radio.checked = true;
  });
  // apply Name
  name.value = config.name;
  // apply Clicks
  clicks.textContent = config.clicks;
  // apply Time
  time.textContent = config.time;
}

function removeField() {
  setTimer('stop');
  mines = [];
  numbers = [];

  config.clicks = 0;
  config.flags = Number(config.mines);
  flags.textContent = '';
  clicks.textContent = 0;
  time.textContent = 0;
  field.textContent = '';
  config.isMinesSetted = false;
  config.isFinish = false;
  config.isStart = false;
  config.isWin = false;
  config.time = 0;
  saveConfig();

  banner.style.opacity = 0;
  banner.style.visibility = 'hidden';
}

function createField() {
  // Set initial flags
  flags.textContent = config.mines;
  config.flags = Number(config.mines);
  saveConfig();
  // Resize field
  field.style.width = levelsParam[config.level].width;
  // Create pins
  let x = 0;
  let y = 0;
  const pins = levelsParam[config.level].pins;
  for (let i = 0; i < Math.pow(pins, 2); i++) {
    const pin = document.createElement('div');
    pin.className = 'pin';
    pin.style.fontSize = levelsParam[config.level].fontSize;
    pin.style.width = levelsParam[config.level].pinSize;
    pin.style.height = levelsParam[config.level].pinSize;
    pin.setAttribute('data-pin', `${x},${y}`);
    field.append(pin);
    x++;
    if (x >= pins) {
      x = 0;
      y++;
    }
  }
}

field.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('pin') && config.isFinish === false ) {
    // Get Index
    const clickedIndex = Array.from(evt.target.parentNode.children).indexOf(evt.target);
    // Set mines
    if (!config.isMinesSetted) {
      setTimer('start');
      setMines(clickedIndex);
      config.isMinesSetted = true;
      config.isStart = true;
      saveConfig();
    }
    // Update clicks
    if (!evt.target.classList.contains('pin__opened')) {
      config.clicks = config.clicks + 1;
      clicks.textContent = config.clicks;
      saveConfig();
      if(config.sounds === 'on') playSoundClick();
    }

    clickPin(evt.target, true);
  }
});

field.addEventListener('contextmenu', (evt) => {
  if(evt.target.classList.contains('pin') && config.isFinish === false ) {
    evt.preventDefault();
    toggleFlag(evt.target);
  }
});

function toggleFlag(pin) {
  if(!pin.classList.contains('pin__opened') && config.isStart) {
    if (pin.classList.contains('pin__flag')) {
      if (config.flags <= config.mines) {
        config.flags++;
        pin.classList.remove('pin__flag');
        pin.textContent = '';
        if(config.sounds === 'on') playSoundRemoveFlag();
      }
    } else {
      if (config.flags > 0) {
        config.flags--;
        pin.classList.add('pin__flag');
        pin.textContent = '🚩';
        if(config.sounds === 'on') playSoundSetFlag();
      }
    }
    saveConfig();
    flags.textContent = config.flags;
  }
}

function clickPin(pin, isByMouse = false) {
  if(pin !== null) {
    const clickedCoordinates = pin.getAttribute('data-pin');
    const [ x, y ] = clickedCoordinates.split(',');
    const counter = pin.getAttribute('data-num');

    if (pin.classList.contains('pin__opened')) return;

    if (mines.includes(clickedCoordinates)) {
      setTimer('stop');
      pin.textContent = '🔥';
      openAllMines();
      console.log(clickedCoordinates + ' - Mine!');
      bannerIcon.textContent = message.lose.icon;
      bannerText.textContent = message.lose.text;
      banner.style.visibility = 'visible';
      banner.style.opacity = 1;
      config.isFinish = true;
      saveConfig();
      if(config.sounds === 'on') playSoundBoom();
    } else {

      if (counter !== null) {
        if (isByMouse) {
          pin.classList.add('pin__opened');
          pin.textContent = counter;
        }
        isWin();
        return;
      }

      // Set timeout to fix Call Stack overflow
      // Check neighboring pins recursively
      setTimeout(() => {
        checkPin(Number(x), Number(y));
      }, 5);

    }

    pin.classList.add('pin__opened');
  }
}

function openAllMines() {
  const allPins = document.querySelectorAll('.pin');
  allPins.forEach(pin => {
    const coordinate = pin.getAttribute('data-pin');
    if (mines.includes(coordinate)) {
      pin.textContent = '🔥';
      pin.classList.add('pin__opened');
    }
  });
}

function isWin() {
  const allPins = document.querySelectorAll('.pin');
  config.isWin = true;
  allPins.forEach(pin => {
    const coordinate = pin.getAttribute('data-pin');
    if (!pin.classList.contains('pin__opened') && !mines.includes(coordinate)) config.isWin = false;
  });
  if (config.isWin) {
    setTimer('stop');
    bannerIcon.textContent = message.win.icon;
    let textResult = message.win.text.replace('N', config.clicks).replace('#', config.time);
    if (config.time <= 1) textResult = textResult.replace('seconds', 'second');
    if (config.clicks === 1) textResult = textResult.replace('moves', 'move');
    bannerText.textContent = textResult;

    banner.style.visibility = 'visible';
    banner.style.opacity = 1;
    config.isFinish = true;
    if(config.sounds === 'on') playSoundWin();
  }
  saveConfig();
}

function checkPin(x, y) {

  const pins = levelsParam[config.level].pins;

  //  x - 1	| x     | x + 1
  //  y - 1	| y - 1 | y - 1
  // -----------------------
  //  x - 1 |   x   | x + 1
  //  y     |   y   | y
  // -----------------------
  //  x - 1	| x     | x + 1
  //  y + 1	| y + 1 | y + 1

  if (x > 0 && y > 0) clickPin(document.querySelector(`[data-pin="${x - 1},${y - 1}"`));
  if (y > 0) clickPin(document.querySelector(`[data-pin="${x},${y - 1}"]`));
  if (y > 0 && x < pins - 1) clickPin(document.querySelector(`[data-pin="${x + 1},${y - 1}"]`));

  if (x > 0) clickPin(document.querySelector(`[data-pin="${x - 1},${y}"`));
  if (x < pins - 1) clickPin(document.querySelector(`[data-pin="${x + 1},${y}"`));

  if (x > 0 && y < pins - 1) clickPin(document.querySelector(`[data-pin="${x - 1},${y + 1}"`));
  if (y < pins - 1) clickPin(document.querySelector(`[data-pin="${x},${y + 1}"]`));
  if (x < pins - 1 && y < pins - 1) clickPin(document.querySelector(`[data-pin="${x + 1},${y + 1}"`));

}

function setMines(clickedIndex) {

  const pins = levelsParam[config.level].pins;
  const numOfmines = Number(config.mines);
  const randomIndexes = new Set();
  while(randomIndexes.size !== numOfmines) {
    const randomIndex = Math.floor(Math.random() * Math.pow(pins, 2));
    if (clickedIndex !== randomIndex) randomIndexes.add(randomIndex);
  }

  let x = 0;
  let y = 0;

  for (let i = 0; i < Math.pow(pins, 2); i++) {

    if (Array.from(randomIndexes).includes(i)) {
      mines.push(`${x},${y}`);
      const pin = document.querySelector(`[data-pin="${x},${y}"]`);
      // For test
      pin.textContent = '🔥';

      //  x - 1	| x     | x + 1
      //  y - 1	| y - 1 | y - 1
      // -----------------------
      //  x - 1 |   x   | x + 1
      //  y     |   y   | y
      // -----------------------
      //  x - 1	| x     | x + 1
      //  y + 1	| y + 1 | y + 1

      if (x > 0 && y > 0) numbers.push(`${x - 1},${y - 1}`);
      if (y > 0) numbers.push(`${x},${y - 1}`);
      if (y > 0 && x < pins - 1) numbers.push(`${x + 1},${y - 1}`);

      if (x > 0) numbers.push(`${x - 1},${y}`);
      if (x < pins - 1) numbers.push(`${x + 1},${y}`);

      if (x > 0 && y < pins - 1) numbers.push(`${x - 1},${y + 1}`);
      if (y < pins - 1) numbers.push(`${x},${y + 1}`);
      if (x < pins - 1 && y < pins - 1) numbers.push(`${x + 1},${y + 1}`);
    }

    x++;
    if (x >= pins) {
      x = 0;
      y++;
    }
  }

  numbers.forEach(num => {
    const [ x, y ] = num.split(',');
    if(!mines.includes(`${x},${y}`)) {
      const pin = document.querySelector(`[data-pin="${x},${y}"]`);
      let counter = pin.getAttribute('data-num');
      if (!counter) counter = 0;
      pin.setAttribute('data-num', Number(counter) + 1);
      pin.style.color = colors[Number(counter)];
      // For test
      pin.textContent = Number(counter) + 1;
     }
	});
}

function setTimer(action) {
  if (action === 'start') {
    gameTimer = setInterval(() => {
      config.time++;
      time.textContent = config.time;
      saveConfig();
    }, 1000);
  }
  if (action === 'stop') {
    clearInterval(gameTimer);
  }
}
