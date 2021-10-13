export class Enemy {
  constructor(container, enemiesNumber, speed) {
    this.container = container;
    this.enemiesNumber = enemiesNumber;
    this.speed = speed;
  }

  element = document.createElement('div');

  enemyInterval = null;

  className = null;

  explosionClass = 'smallExplosion';

  init() {
    this.className = this.determineEnemyType();
    this.element.classList.add(this.className);
    this.container.appendChild(this.element);
    this.element.style.left = `${Math.floor(
      Math.random() * (window.innerWidth - this.element.offsetWidth),
    )}px`;
    this.element.style.top = '0px';
    this.move();
  }

  determineEnemyType() {
    const randomNumber = Math.floor(Math.random() * this.enemiesNumber) + 1;
    if (randomNumber === 1) {
      this.explosionClass = 'bigExplosion';

      return 'enemy1';
    }
    if (randomNumber === 2) {
      return 'enemy2';
    }
    if (randomNumber === 3) {
      return 'enemy3';
    }
    if (randomNumber === 4) {
      return 'enemy4';
    }
    if (randomNumber === 5) {
      this.explosionClass = 'bigExplosion';

      return 'enemy5';
    }
    return 'enemy1';
  }

  move() {
    this.enemyInterval = setInterval(() => {
      this.element.style.top = `${parseInt(this.element.style.top, 10) + 10}px`;
      if (
        parseInt(this.element.style.top, 10) >
        window.innerHeight - this.element.offsetHeight + 5
      ) {
        this.explode();
      }
    }, this.speed);
  }

  explode() {
    this.element.classList.remove(this.className);
    this.element.classList.add(this.explosionClass);

    setTimeout(() => {
      this.element.remove();
    }, 1000);
    clearInterval(this.enemyInterval);
  }
}
