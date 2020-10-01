export default class Slider {
  constructor(props) {
    this.slider = props.slider;
    this.wrapper = props.slider.querySelector('.slider__wrapper');
    this.slides = props.slider.querySelectorAll('.slider__slide');
    this.numberOfSlides = props.slider.querySelectorAll('.slider__slide').length;
    this.state = {
      currentSlide: props.slideToShow,
      modifier: 0,
    };
    this.showSlide();
    this.init();
  }

  init() {
    this.slider.addEventListener('click', (e) => {
      if (e.target.closest('.control')) {
        const direction = e.target.closest('.control').className.match(/(back|forward)/)[0];
        this.changeSlide(direction);
        this.showSlide();
      }
    });
  }

  showSlide() {
    const { currentSlide, modifier } = this.state;
    this.slides[currentSlide - 1].style.transform = `translateX(${(modifier) * 100}%)`;
    this.wrapper.style.transform = `translateX(${((currentSlide + modifier) * 100 - 100) * -1}%)`;
  }

  changeSlide(direction) {
    const { currentSlide, modifier } = this.state;
    if (direction === 'back') {
      if (currentSlide > 1) {
        this.state.currentSlide = currentSlide - 1;
      } else {
        this.state.currentSlide = this.numberOfSlides;
        this.state.modifier = modifier - this.numberOfSlides;
      }
    } else if (direction === 'forward') {
      if (currentSlide < this.numberOfSlides) {
        this.state.currentSlide = currentSlide + 1;
      } else {
        this.state.currentSlide = 1;
        this.state.modifier = modifier + this.numberOfSlides;
      }
    }
  }
}
