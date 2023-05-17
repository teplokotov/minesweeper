export const body = document.querySelector('body');

export const drawPage = () => {

  // Body
  const body = document.querySelector('body');
  body.className = 'body theme_light';

  // Page
  const page = document.createElement('div');
  page.className = 'page';
  body.prepend(page);

  // Header
  const header = document.createElement('header');
  header.className = 'header';
  page.prepend(header);

  // Heading
  const heading = document.createElement('h1');
  heading.className = 'header__heading';
  heading.textContent = 'RSS 💣 Minesweeper';
  header.prepend(heading);

  // Main
  const main = document.createElement('main');
  main.className = 'main';
  header.after(main);

  // Section 'left-side'
  const leftSide = document.createElement('section');
  leftSide.className = 'left-side';
  leftSide.setAttribute('aria-label','Left side');
  main.prepend(leftSide);

  // Section 'left-side' > form 'formSettings'
  const formSettings = document.createElement('form');
  formSettings.className = 'form';
  formSettings.name = 'formSettings';
  formSettings.setAttribute('novalidate','novalidate');
  leftSide.prepend(formSettings);

  // Section 'left-side' > form 'formTheme'
  const formTheme = document.createElement('form');
  formTheme.className = 'form';
  formTheme.name = 'formTheme';
  formTheme.setAttribute('novalidate','novalidate');
  formSettings.after(formTheme);

  // Section 'left-side' > form 'formSounds'
  const formSounds = document.createElement('form');
  formSounds.className = 'form';
  formSounds.name = 'formSounds';
  formSounds.setAttribute('novalidate','novalidate');
  formTheme.after(formSounds);

  // form 'formSettings' > label 'userName'
  const labelUserName = document.createElement('label');
  labelUserName.className = 'form__heading';
  labelUserName.setAttribute('for','userName');
  labelUserName.textContent = '👤 Name';
  formSettings.prepend(labelUserName);

  // form 'formSettings' > input 'userName'
  const userName = document.createElement('input');
  userName.className = 'form__input';
  userName.name = 'userName';
  userName.id = 'userName';
  userName.minLength = '2';
  userName.maxLength = '30';
  userName.pattern = '^[a-zA-Zа-яА-ЯёЁ\\-\\s]+$';
  userName.setAttribute('data-error-message','Only Latin, Cyrillic letters, hyphens and spaces are allowed.');
  userName.setAttribute('required','required');
  labelUserName.after(userName);

  // form 'formSettings' > heading 'Field size'
  const fieldSizeHeading = document.createElement('h2');
  fieldSizeHeading.className = 'form__heading';
  fieldSizeHeading.textContent = '📐 Field size';
  userName.after(fieldSizeHeading);

  // heading 'Field size' > span
  const fieldSizeHeadingSpan = document.createElement('span');
  fieldSizeHeadingSpan.className = 'form__heading_thin field-size';
  fieldSizeHeadingSpan.textContent = '10x10';
  fieldSizeHeading.append(fieldSizeHeadingSpan);

  // form 'formSettings' > fieldset
  const formSettingsFieldset = document.createElement('fieldset');
  formSettingsFieldset.className = 'form__fieldset';
  fieldSizeHeading.after(formSettingsFieldset);

  // form 'formSettings' > fieldset > span 1
  const formSettingsFieldsetSpanFirst = document.createElement('span');
  formSettingsFieldsetSpanFirst.className = 'form__span';
  formSettingsFieldset.prepend(formSettingsFieldsetSpanFirst);

  // form 'formSettings' > fieldset > span 1 > radio
  const radioEasy = document.createElement('input');
  radioEasy.className = 'form__level';
  radioEasy.id = 'easyLevel';
  radioEasy.type = 'radio';
  radioEasy.name = 'level';
  radioEasy.value = 'easy';
  radioEasy.checked = true;
  formSettingsFieldsetSpanFirst.prepend(radioEasy);

  // form 'formSettings' > fieldset > span 1 > radio > label
  const labelEasy = document.createElement('label');
  labelEasy.className = 'form__level';
  labelEasy.textContent = 'Easy';
  labelEasy.setAttribute('for', 'easyLevel');
  radioEasy.after(labelEasy);

  // form 'formSettings' > fieldset > span 2
  const formSettingsFieldsetSpanSecond = document.createElement('span');
  formSettingsFieldsetSpanSecond.className = 'form__span';
  formSettingsFieldsetSpanFirst.after(formSettingsFieldsetSpanSecond);

  // form 'formSettings' > fieldset > span 2 > radio
  const radioNormal = document.createElement('input');
  radioNormal.className = 'form__level';
  radioNormal.id = 'normalLevel';
  radioNormal.type = 'radio';
  radioNormal.name = 'level';
  radioNormal.value = 'normal';
  radioNormal.checked = false;
  formSettingsFieldsetSpanSecond.prepend(radioNormal);

  // form 'formSettings' > fieldset > span 2 > radio > label
  const labelNormal = document.createElement('label');
  labelNormal.className = 'form__level';
  labelNormal.textContent = 'Normal';
  labelNormal.setAttribute('for', 'normalLevel');
  radioNormal.after(labelNormal);

  // form 'formSettings' > fieldset > span 3
  const formSettingsFieldsetSpanThird = document.createElement('span');
  formSettingsFieldsetSpanThird.className = 'form__span';
  formSettingsFieldsetSpanSecond.after(formSettingsFieldsetSpanThird);

  // form 'formSettings' > fieldset > span 3 > radio
  const radioHard = document.createElement('input');
  radioHard.className = 'form__level';
  radioHard.id = 'hardLevel';
  radioHard.type = 'radio';
  radioHard.name = 'level';
  radioHard.value = 'hard';
  radioHard.checked = false;
  formSettingsFieldsetSpanThird.prepend(radioHard);

  // form 'formSettings' > fieldset > span 3 > radio > label
  const labelHard = document.createElement('label');
  labelHard.className = 'form__level';
  labelHard.textContent = 'Hard';
  labelHard.setAttribute('for', 'hardLevel');
  radioHard.after(labelHard);

  // form 'formSettings' > fieldset > label 'rangeHeading'
  const rangeHeading = document.createElement('label');
  rangeHeading.className = 'form__heading';
  rangeHeading.textContent = '🧮 Number of mines';
  rangeHeading.setAttribute('for', 'minesRange');
  formSettingsFieldset.after(rangeHeading);

  // rangeHeading > span
  const rangeHeadingSpan = document.createElement('span');
  rangeHeadingSpan.className = 'form__heading_thin mines';
  rangeHeadingSpan.textContent = '10';
  rangeHeading.append(rangeHeadingSpan);

  // form 'formSettings' > span 'form__slider-wrapper'
  const sliderWrapper = document.createElement('span');
  sliderWrapper.className = 'form__slider-wrapper';
  rangeHeading.after(sliderWrapper);

  // form 'formSettings' > span 'form__slider-wrapper' > input 'range'
  const minesRange = document.createElement('input');
  minesRange.className = 'form__slider';
  minesRange.id = 'minesRange';
  minesRange.type = 'range';
  minesRange.min = '10';
  minesRange.max = '99';
  minesRange.value = '10';
  sliderWrapper.prepend(minesRange);

  // form 'formSettings' > button 'start game'
  // <button class="form__button btn-set" type="button">🎲 New game</button>
  const btnStart = document.createElement('button');
  btnStart.className = 'form__button btn-set';
  btnStart.type = 'button';
  btnStart.textContent = '🎲 New game';
  sliderWrapper.after(btnStart);

  // Section 'left-side' > form 'formTheme' > heading 'Theme'
  const headingTheme = document.createElement('h2');
  headingTheme.className = 'form__heading';
  headingTheme.textContent = '🦄 Theme';
  formTheme.prepend(headingTheme);

  // Section 'left-side' > form 'formTheme' > fieldset
  const fieldsetTheme = document.createElement('fieldset');
  fieldsetTheme.className = 'form__fieldset';
  headingTheme.after(fieldsetTheme);

  // Section 'left-side' > form 'formTheme' > fieldset > span 1
  const fieldsetThemeSpanFirst = document.createElement('span');
  fieldsetThemeSpanFirst.className = 'form__span';
  fieldsetTheme.prepend(fieldsetThemeSpanFirst);

  // Section 'left-side' > form 'formTheme' > fieldset > span 1 > radio 'Light'
  const radioLight = document.createElement('input');
  radioLight.className = 'form__theme';
  radioLight.id = 'themeLight';
  radioLight.type = 'radio';
  radioLight.name = 'theme';
  radioLight.value = 'light';
  radioLight.checked = true;
  fieldsetThemeSpanFirst.prepend(radioLight);

  // Section 'left-side' > form 'formTheme' > fieldset > span 1 > radio 'Light' > label
  const labelRadioLight = document.createElement('label');
  labelRadioLight.className = 'form__label';
  labelRadioLight.textContent = 'Light';
  labelRadioLight.setAttribute('for','themeLight');
  radioLight.after(labelRadioLight);

  // Section 'left-side' > form 'formTheme' > fieldset > span 2
  const fieldsetThemeSpanSecond = document.createElement('span');
  fieldsetThemeSpanSecond.className = 'form__span';
  fieldsetThemeSpanFirst.after(fieldsetThemeSpanSecond);

  // Section 'left-side' > form 'formTheme' > fieldset > span 2 > radio 'Dark'
  const radioDark = document.createElement('input');
  radioDark.className = 'form__theme';
  radioDark.id = 'themeDark';
  radioDark.type = 'radio';
  radioDark.name = 'theme';
  radioDark.value = 'dark';
  radioDark.checked = false;
  fieldsetThemeSpanSecond.prepend(radioDark);

  // Section 'left-side' > form 'formTheme' > fieldset > span 2 > radio 'Dark' > label
  const labelRadioDark = document.createElement('label');
  labelRadioDark.className = 'form__label';
  labelRadioDark.textContent = 'Dark';
  labelRadioDark.setAttribute('for','themeDark');
  radioDark.after(labelRadioDark);

  // Section 'left-side' > form 'formSounds' > heading 'Sounds'
  const headingSounds = document.createElement('h2');
  headingSounds.className = 'form__heading';
  headingSounds.textContent = '🔊 Sounds';
  formSounds.prepend(headingSounds);

  // Section 'left-side' > form 'formSounds' > fieldset
  const fieldsetSounds = document.createElement('fieldset');
  fieldsetSounds.className = 'form__fieldset';
  headingSounds.after(fieldsetSounds);

  // Section 'left-side' > form 'formSounds' > fieldset > span 1
  const fieldsetSoundsSpanFirst = document.createElement('span');
  fieldsetSoundsSpanFirst.className = 'form__span';
  fieldsetSounds.prepend(fieldsetSoundsSpanFirst);

  // Section 'left-side' > form 'formSounds' > fieldset > span 1 > radio 'On'
  const radioOn = document.createElement('input');
  radioOn.className = 'form__sounds';
  radioOn.id = 'soundsOn';
  radioOn.type = 'radio';
  radioOn.name = 'sounds';
  radioOn.value = 'on';
  radioOn.checked = true;
  fieldsetSoundsSpanFirst.prepend(radioOn);

  // Section 'left-side' > form 'formSounds' > fieldset > span 1 > radio 'On' > label
  const labelRadioOn = document.createElement('label');
  labelRadioOn.className = 'form__label';
  labelRadioOn.textContent = 'On';
  labelRadioOn.setAttribute('for','soundsOn');
  radioOn.after(labelRadioOn);

  // Section 'left-side' > form 'formSounds' > fieldset > span 2
  const fieldsetSoundsSpanSecond = document.createElement('span');
  fieldsetSoundsSpanSecond.className = 'form__span';
  fieldsetSoundsSpanFirst.after(fieldsetSoundsSpanSecond);

  // Section 'left-side' > form 'formSounds' > fieldset > span 2 > radio 'Off'
  const radioOff = document.createElement('input');
  radioOff.className = 'form__sounds';
  radioOff.id = 'soundsOff';
  radioOff.type = 'radio';
  radioOff.name = 'sounds';
  radioOff.value = 'off';
  radioOff.checked = false;
  fieldsetSoundsSpanSecond.prepend(radioOff);

  // Section 'left-side' > form 'formSounds' > fieldset > span 2 > radio 'Off' > label
  const labelRadioOff = document.createElement('label');
  labelRadioOff.className = 'form__label';
  labelRadioOff.textContent = 'Off';
  labelRadioOff.setAttribute('for','soundsOff');
  radioOff.after(labelRadioOff);

  // Section 'right-side'
  const rightSide = document.createElement('section');
  rightSide.className = 'right-side';
  rightSide.setAttribute('aria-label','Right side');
  leftSide.after(rightSide);

  // Section 'right-side' > section 'dashboard'
  const dashboard = document.createElement('section');
  dashboard.className = 'dashboard';
  dashboard.setAttribute('area-label', 'Dashboard');
  rightSide.append(dashboard);

  // Section 'right-side' > div 'dashboard__score'
  const dashboardScore = document.createElement('div');
  dashboardScore.className = 'dashboard__score score';
  dashboard.append(dashboardScore);

  // Section 'right-side' > div 'dashboard__score' > heading
  const scoreHeading = document.createElement('h2');
  scoreHeading.className = 'score__heading';
  scoreHeading.textContent = '🎯 Clicks';
  dashboardScore.append(scoreHeading);

  // Section 'right-side' > div 'dashboard__score' > p
  const score = document.createElement('p');
  score.className = 'score_view';
  score.textContent = '0';
  scoreHeading.after(score);

  // Section 'right-side' > div 'dashboard__time'
  const dashboardTime = document.createElement('div');
  dashboardTime.className = 'dashboard__time time';
  dashboardScore.after(dashboardTime);

  // Section 'right-side' > div 'dashboard__time' > heading
  const timeHeading = document.createElement('h2');
  timeHeading.className = 'time__heading';
  timeHeading.textContent = '⏳ Time';
  dashboardTime.append(timeHeading);

  // Section 'right-side' > div 'dashboard__time' > p
  const time = document.createElement('p');
  time.className = 'time_view';
  time.textContent = '0';
  timeHeading.after(time);

  // Section 'right-side' > section 'field-wrapper'
  const fieldWrapper = document.createElement('section');
  fieldWrapper.className = 'field-wrapper';
  fieldWrapper.setAttribute('area-label', 'Game field');
  dashboard.after(fieldWrapper);

  // Section 'right-side' > section 'field-wrapper' > div 'field'
  const field = document.createElement('div');
  field.className = 'field';
  fieldWrapper.append(field);

  // Section 'score-board'
  const scoreBoard = document.createElement('section');
  scoreBoard.className = 'score-board';
  scoreBoard.setAttribute('aria-label','Score-board');
  rightSide.after(scoreBoard);

  // Section 'score-board' > heading 'Score-board'
  const scoreBoardHeading = document.createElement('h2');
  scoreBoardHeading.className = 'score-board__heading';
  scoreBoardHeading.textContent = '🏆 Latest 10 results';
  scoreBoard.append(scoreBoardHeading);

  // Section 'score-board' > heading 'Score-board' > table
  const table = document.createElement('table');
  table.className = 'score-board__table table';
  scoreBoardHeading.after(table);

  // Section 'score-board' > heading 'Score-board' > table > thead
  const thead = document.createElement('thead');
  thead.className = 'table__heading';
  thead.innerHTML = '<tr><th>Date</th><th>Name</th><th>Level</th><th>Clicks</th><th>Time</th></tr>';
  table.append(thead);

  // Section 'score-board' > heading 'Score-board' > table > tbody
  const tbody = document.createElement('tbody');
  thead.after(tbody);

  // Footer
  const footer = document.createElement('footer');
  footer.className = 'footer';
  main.after(footer);

  // Author
  const footerAuthor = document.createElement('p');
  footerAuthor.className = 'footer__author';
  footerAuthor.textContent = '2023, ';
  footer.prepend(footerAuthor);

  // Author link
  const footerLink = document.createElement('a');
  footerLink.className = 'footer__link';
  footerLink.textContent = 'teplokotov';
  footerLink.href = 'https://github.com/teplokotov';
  footerLink.target = '_blank';
  footerAuthor.append(footerLink);

}
