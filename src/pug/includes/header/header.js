const header = document.querySelector('.header');
const burger = header.querySelector('.header__burger');
const logo = header.querySelector('.header__brand');

burger.addEventListener('click', () => {
  logo.classList.toggle('hidden');
  header.classList.toggle('open');
  burger.classList.toggle('open');
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
