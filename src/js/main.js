/* eslint-env browser */
const throttle = require('throttle-debounce/throttle');

if ('FontFace' in window) {
  document.fonts.ready.then(() => {
    document.documentElement.classList.add('fonts-loaded');
  });
}

if (document.querySelector('nav')) {
  window.addEventListener('scroll', throttle(100, checkForShadow));
}

function checkForShadow() {
  if (window.scrollY < 10) {
    document.querySelector('nav').classList.remove('shadow');
  } else {
    document.querySelector('nav').classList.add('shadow');
  }
}
