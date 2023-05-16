// Styles
// import '../pages/index.css';

import { drawPage, body } from "../components/page.js";

drawPage();

const theme = document.querySelectorAll('.form__theme');

theme.forEach(radio => {
  radio.addEventListener('change', (evt) => {
    body.classList.toggle('theme_dark');
    body.classList.toggle('theme_light');
  });
})
