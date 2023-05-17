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


let config = {
  levels: {
    easy: 10,
    normal: 15,
    hard: 25
  },
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
    levelHeading.textContent = config.levels[config.level] + 'x' + config.levels[config.level];
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
      levelHeading.textContent = config.levels[config.level] + 'x' + config.levels[config.level];
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
