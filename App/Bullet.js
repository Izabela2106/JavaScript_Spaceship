export class Bullet {
  constructor(container, x, y) {
    this.container = container;
    this.x = x;
    this.y = y;
  }

  element = document.createElement('div');

  shotInterwal = null;

  speed = 10;

  init() {
    this.element.classList.add('bullet');
    this.container.appendChild(this.element);
    this.element.style.left = `${this.x - this.element.offsetWidth / 2}px`;
    this.element.style.top = `${this.y - this.element.offsetHeight / 2}px`;
    this.move();
  }

  move() {
    this.shotInterwal = setInterval(() => {
      this.element.style.top = `${parseInt(this.element.style.top, 10) - 5}px`;
    }, this.speed);
  }

  remove() {
    this.element.remove();
    clearInterval(this.shotInterwal);
  }
}
