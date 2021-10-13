import { Bullet } from './Bullet.js';

export class Spaceship {
  element = document.createElement('div');

  arrowRight = false;

  arrowLeft = false;

  shipSpeed = 8;

  bullets = [];

  constructor(container) {
    this.container = container;
  }

  init() {
    this.element.classList.add('ship');
    this.container.appendChild(this.element);
    this.setInitialPosition();
    this.addListeners();
    this.movingLoop();
  }

  setInitialPosition() {
    this.element.style.left = `${window.innerWidth / 2 - this.element.offsetWidth / 2}px`;
    this.element.style.bottom = '0px';
  }

  addListeners() {
    window.addEventListener('keydown', ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          this.arrowLeft = true;
          break;
        case 39:
          this.arrowRight = true;
          break;
        default:
          break;
      }
    });

    window.addEventListener('keyup', ({ keyCode }) => {
      switch (keyCode) {
        case 32:
          this.shot();
          break;
        case 37:
          this.arrowLeft = false;
          break;
        case 39:
          this.arrowRight = false;
          break;
        default:
          break;
      }
    });
  }

  shot() {
    const bullet = new Bullet(
      this.container,
      this.element.getBoundingClientRect().x + this.element.offsetWidth / 2,
      this.element.getBoundingClientRect().y,
    );
    bullet.init();
    this.bullets.push(bullet);
  }

  movingLoop = () => {
    if (this.arrowLeft && parseInt(this.element.style.left, 10) > 0) {
      this.element.style.left = `${parseInt(this.element.style.left, 10) - this.shipSpeed}px`;
    }
    if (
      this.arrowRight &&
      parseInt(this.element.style.left, 10) < window.innerWidth - this.element.offsetWidth - 8
    ) {
      this.element.style.left = `${parseInt(this.element.style.left, 10) + this.shipSpeed}px`;
    }
    window.requestAnimationFrame(this.movingLoop);
  };
}
