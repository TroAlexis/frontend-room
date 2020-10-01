const header = document.querySelector('.header');
const burger = header.querySelector('.header__burger');
const logo = header.querySelector('.header__brand');

burger.addEventListener('click', () => {
  logo.classList.toggle('hidden');
  header.classList.toggle('open');
  burger.classList.toggle('open');
});
