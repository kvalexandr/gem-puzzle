/* eslint-disable class-methods-use-this */
export default class Header {
  constructor(container) {
    this.container = container;
    this.createHeader();
  }

  createHeader() {
    const panel = document.createElement('div');
    panel.classList.add('panel');

    this.header = document.createElement('div');
    this.header.classList.add('header');
    panel.appendChild(this.header);

    const moveContainer = this.createMove();
    this.header.appendChild(moveContainer);

    const timerContainer = this.createTimer();
    this.header.appendChild(timerContainer);

    const pauseContainer = this.createPause();
    this.header.appendChild(pauseContainer);

    this.container.appendChild(panel);
  }

  createMove() {
    const moveContainer = document.createElement('div');
    moveContainer.classList.add('info');

    const moveText = document.createElement('span');
    moveText.classList.add('text');
    moveText.textContent = 'Moves: ';
    moveContainer.appendChild(moveText);

    this.move = document.createElement('span');
    this.move.classList.add('value');
    this.setMove();

    moveContainer.appendChild(this.move);

    return moveContainer;
  }

  createTimer() {
    const timerContainer = document.createElement('div');
    timerContainer.classList.add('info');

    const timerText = document.createElement('span');
    timerText.classList.add('text');
    timerText.textContent = 'Timer: ';
    timerContainer.appendChild(timerText);

    this.timer = document.createElement('span');
    this.timer.classList.add('value');
    this.setTimer();
    timerContainer.appendChild(this.timer);

    return timerContainer;
  }

  createPause() {
    const pauseContainer = document.createElement('div');
    pauseContainer.classList.add('info');

    this.pause = document.createElement('button');
    this.pause.classList.add('pause');
    this.setTextPause();
    pauseContainer.appendChild(this.pause);

    return pauseContainer;
  }

  setMove() {
    this.move.textContent = 0;
  }

  setTimer() {
    this.timer.textContent = '00 : 00';
  }

  setTextPause() {
    this.pause.textContent = 'Pause game';
  }

  setTextResume() {
    this.pause.textContent = 'Resume game';
  }
}
