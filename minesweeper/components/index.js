// Styles
// import '../pages/index.css';

const body = document.querySelector('.body');
const theme = document.querySelectorAll('.form__theme');

theme.forEach(radio => {
  radio.addEventListener('change', (evt) => {
    body.classList.toggle('theme_dark');
    body.classList.toggle('theme_light');
  });
})
