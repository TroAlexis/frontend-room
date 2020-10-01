// WEBPACK ENTRY FILE MAIN

import 'Includes/header/header';

import 'Scss/index.scss';

import Slider from 'Includes/slider/slider';

const slider = new Slider({
  slider: document.querySelector('.slider'),
  slideToShow: 1,
});

if (module.hot) {
  module.hot.accept();
}
