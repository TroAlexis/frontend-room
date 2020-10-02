export default class Slider {
  constructor(props) {
    this.slider = props.slider;
    this.wrapper = props.slider.querySelector('.slider__wrapper');
    this.slides = props.slider.querySelectorAll('.slider__slide');
    this.controls = props.slider.querySelector('.controls');
    this.numberOfSlides = props.slider.querySelectorAll('.slider__slide').length;
    this.state = {
      currentSlide: props.slideToShow,
      modifier: 0,
    };
    this.init();
    this.showSlide();
  }

  init() {
    this.controls.addEventListener('click', (e) => {
      if (e.target.closest('.control')) {
        const direction = e.target.closest('.control').className.match(/(back|forward)/)[0];
        this.changeSlide(direction);
        this.showSlide();
      }
    });
    this.swipeDetect();
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

  swipeDetect() {
    let swipeDir;
    let startX;
    let startY;
    let distX;
    let distY;
    const threshold = 120; // required min distance traveled to be considered swipe
    const restraint = 100; // maximum distance allowed at the same time in perpendicular direction
    const allowedTime = 600; // maximum time allowed to travel that distance
    let elapsedTime;
    let startTime;

    this.wrapper.addEventListener('touchstart', (e) => {
      const touchObj = e.changedTouches[0];
      swipeDir = 'none';
      startX = touchObj.pageX;
      startY = touchObj.pageY;
      startTime = new Date().getTime(); // record time when finger first makes contact with surface
    }, false);

    this.wrapper.addEventListener('touchend', (e) => {
      const touchobj = e.changedTouches[0];
      // get horizontal dist traveled by finger while in contact with surface
      distX = touchobj.pageX - startX;
      // get vertical dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY;
      elapsedTime = new Date().getTime() - startTime; // get time elapsed
      if (elapsedTime <= allowedTime) { // first condition for awipe met
        // 2nd condition for horizontal swipe met
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          // if dist traveled is negative, it indicates left swipe
          swipeDir = (distX < 0) ? 'forward' : 'back';
        }
      }
      this.changeSlide(swipeDir);
      this.showSlide();
      e.preventDefault();
    }, false);
  }
}
