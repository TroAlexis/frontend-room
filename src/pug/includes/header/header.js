const header = document.querySelector('.header');
const burger = header.querySelector('.header__burger');
const logo = header.querySelector('.header__brand');
const nav = header.querySelector('.header__nav');
const links = header.querySelectorAll('.header__link');

burger.addEventListener('click', () => {
  logo.classList.toggle('hidden');
  burger.classList.toggle('open');
  nav.classList.toggle('open');
  links.forEach((link) => {
    link.classList.toggle('visible');
  });
});
