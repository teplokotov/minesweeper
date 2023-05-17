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
const clicks = document.querySelector('.score_view');
// Time
const time = document.querySelector('.time_view');
// Field
const field = document.querySelector('.field');
// Button 'New Game'
const btnSet = document.querySelector('.btn-set');

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
  isMinesSetted: false,
};

const mines = [];

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
  field.textContent = '';
  config.isMinesSetted = false;
  saveConfig();
}

function createField() {
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
  if(evt.target.classList.contains('pin')) {
    // Get Coordinates
    const clickedCoordinates = evt.target.getAttribute('data-pin');
    const clickedIndex = Array.from(evt.target.parentNode.children).indexOf(evt.target);
    // Set mines
    if (!config.isMinesSetted) {
      setMines(clickedIndex);
      config.isMinesSetted = true;
      saveConfig();
    }
    // Check: is it mine?
    console.log(clickedCoordinates);
    if (mines.includes(clickedCoordinates)) console.log(clickedCoordinates + ' - Mine!');

  }
});

function setMines(clickedIndex) {

  const numOfmines = Number(config.mines);
  const randomIndexes = new Set();
  while(randomIndexes.size !== numOfmines) {
    const randomIndex = Math.floor(Math.random() * 100) + 1;
    if (clickedIndex !== randomIndex) randomIndexes.add(randomIndex);
  }
  console.log(randomIndexes);

  let x = 0;
  let y = 0;
  const pins = levelsParam[config.level].pins;
  for (let i = 0; i < Math.pow(pins, 2); i++) {

    if (Array.from(randomIndexes).includes(i)) mines.push(`${x},${y}`);

    x++;
    if (x >= pins) {
      x = 0;
      y++;
    }
  }
  console.log(mines);
}

