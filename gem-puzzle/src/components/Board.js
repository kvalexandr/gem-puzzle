/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import Gem from './Gem';
import { getFromLocalStorage } from './utils';

export default class Board {
  constructor(container, size) {
    this.container = container;
    this.size = size;
    this.onSwap = () => { };
    this.onFinished = () => { };
    this.timerID = null;

    this.board = this.createBoard();
    this.container.appendChild(this.board);

    this.newGame();
  }

  createBoard() {
    const board = document.createElement('div');
    board.classList.add('board');

    return board;
  }

  newGame() {
    const settings = getFromLocalStorage('settings', '{}');
    this.size = settings.size || this.size;
    this.board.innerHTML = '';
    this.move = 0;
    this.counter = 0;
    this.pause = false;
    this.win = false;
    this.gems = [];
    this.setup();
    this.start();
  }

  start() {
    this.pause = false;
    this.timerID = setInterval(() => {
      this.counter += 1;
      this.onTime(this.counter);
    }, 1000);
  }

  stop() {
    console.log('stop ', this.timerID);
    clearInterval(this.timerID);
    this.pause = true;
  }

  setup() {
    for (let i = 0; i < this.size ** 2; i += 1) {
      this.gems.push(new Gem(this, i));
    }
    this.shuffle();
    // this.start();
  }

  swapGems(i, j) {
    this.gems[j].setPosition(i);
    this.gems[i].setPosition(j);
    [this.gems[i], this.gems[j]] = [this.gems[j], this.gems[i]];
  }

  findEmpty() {
    return this.gems.findIndex(gem => gem.isEmpty);
  }

  findPosition(index) {
    return this.gems.findIndex(gem => gem.index === index);
  }

  shuffle() {
    for (let i = this.gems.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      this.swapGems(i, j);
    }
  }

  isWin() {
    let count = 0;
    this.gems.forEach((gem, idx) => {
      if (gem.index !== idx) count += 1;
    });
    this.win = count === 0;
    return this.win;
  }

  load() {
    const load = [0, 1, 2, 3, 5, 8, 6, 4, 7];

    for (let position = 0; position < this.size ** 2; position += 1) {
      this.gems.push(new Gem(this, load[position], position));
    }

    this.start();
    console.log(this.gems);
  }
}
