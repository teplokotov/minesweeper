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
};

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
}

function createField() {
  // Resize field
  field.style.width = levelsParam[config.level].width;
  // Create pins
  const pins = levelsParam[config.level].pins;
  for (let i = 0; i < Math.pow(pins, 2); i++) {
    const pin = document.createElement('div');
    pin.className = 'pin';
    pin.style.fontSize = levelsParam[config.level].fontSize;
    pin.style.width = levelsParam[config.level].pinSize;
    pin.style.height = levelsParam[config.level].pinSize;
    field.append(pin);
  }
}
