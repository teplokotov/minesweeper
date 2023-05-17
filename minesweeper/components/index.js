// Styles
// import '../pages/index.css';

import { drawPage, body } from "../components/page.js";

drawPage();

const config = {
                levels: {
                  easy: 10,
                  normal: 15,
                  hard: 25
                },
                level: 'easy',
                mines: 10,
                theme: 'light',
                sounds: 'on'
                };

// Theme
const theme = document.querySelectorAll('.form__theme');
// Level
const level = document.querySelectorAll('.form__level');
const levelHeading = document.querySelector('.field-size');
// Mines
const slider = document.querySelector('.form__slider');
const minesHeading = document.querySelector('.mines');


theme.forEach(radio => {
  radio.addEventListener('change', (evt) => {
    body.classList.toggle('theme_dark');
    body.classList.toggle('theme_light');
  });
});

level.forEach(radio => {
  radio.addEventListener('change', (evt) => {
    config.level = radio.value;
    levelHeading.textContent = config.levels[config.level] + 'x' + config.levels[config.level];
  });
});

slider.addEventListener('input', (evt) => {
  config.mines = evt.target.value;
  minesHeading.textContent = config.mines;
});
