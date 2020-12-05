/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import Gem from './Gem';
import { addToLocalStorage, getFromLocalStorage, randomIndex } from './utils';

export default class Board {
  constructor(container, size) {
    this.container = container;
    this.size = size;
    this.onSwap = () => { };
    this.onFinished = () => { };
    this.timerID = null;

    this.board = this.createBoard();
    this.container.appendChild(this.board);
    this.width = this.board.offsetWidth;

    this.newGame(true);
  }

  createBoard() {
    const board = document.createElement('div');
    board.classList.add('board');

    return board;
  }

  newGame(load = false) {
    const loadStorage = getFromLocalStorage('save');
    const settings = getFromLocalStorage('settings', '{}');
    if (loadStorage && load) {
      this.size = loadStorage.size;
      this.board.innerHTML = '';
      this.imageSrc = loadStorage.imageSrc;
      this.move = loadStorage.move;
      this.counter = loadStorage.counter;
      this.gems = [];
      this.load(loadStorage.gems);
    } else {
      this.size = settings.size || this.size;
      this.board.innerHTML = '';
      this.imageSrc = `images/${randomIndex(1, 9)}.jpg`;
      this.move = 0;
      this.counter = 0;
      this.gems = [];
      this.setup();
    }

    this.pause = false;
    this.win = false;
    this.start();
  }

  start() {
    this.pause = false;
    this.timerID = setInterval(() => {
      this.counter += 1;
      this.onTime(this.counter);
      this.save();
    }, 1000);
  }

  stop() {
    clearInterval(this.timerID);
    this.pause = true;
  }

  setup() {
    for (let i = 0; i < this.size ** 2; i += 1) {
      this.gems.push(new Gem(this, i));
    }
    this.shuffle();
  }

  load(load) {
    for (let position = 0; position < this.size ** 2; position += 1) {
      this.gems.push(new Gem(this, load[position], position));
    }
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
    if (!this.isSolved()) this.shuffle();
  }

  isSolved() {
    let cnt = 0;
    for (let i = 0; i < this.gems.length; i += 1) {
      if (this.gems[i].index !== this.size ** 2 - 1) {
        for (let j = i + 1; j < this.gems.length; j += 1) {
          if (this.gems[i].index > this.gems[j].index) {
            cnt += 1;
          }
        }
      } else if ((this.size ** 2) % 2 === 0) {
        const row = Math.floor(i / this.size) + 1;
        cnt += row;
      }
    }
    return cnt % 2 === 0;
  }

  isWin() {
    let count = 0;
    this.gems.forEach((gem, idx) => {
      if (gem.index !== idx) count += 1;
    });
    this.win = count === 0;
    return this.win;
  }

  sound() {
    const audio = new Audio('audio/btn.wav');
    audio.currentTime = 0;
    audio.play();
  }

  save() {
    const saveGemsPosition = [];
    this.gems.forEach(item => {
      saveGemsPosition.push(item.index);
    });

    const saveData = {
      gems: saveGemsPosition,
      size: this.size,
      imageSrc: this.imageSrc,
      move: this.move,
      counter: this.counter
    };

    addToLocalStorage('save', saveData);
  }

  score() {
    const score = {
      date: new Date().toLocaleDateString(),
      move: this.move,
      time: this.counter,
      size: this.size
    };

    const scoreStoarage = getFromLocalStorage('score', '[]').slice(0, 9);
    scoreStoarage.unshift(score);
    scoreStoarage.sort((a, b) => a.move - b.move);
    addToLocalStorage('score', scoreStoarage);
  }
}
