import Title from './Title';
import Header from './Header';
import Board from './Board';
import Menu from './Menu';
import Win from './Win';
import { getTime, getTimeText } from './utils';

export default class Puzzle {
  constructor(size) {
    this.size = size;
  }

  init() {
    const container = document.createElement('div');
    container.classList.add('container');
    document.body.append(container);

    this.title = new Title(container);
    this.header = new Header(container);
    this.board = new Board(container, this.size);
    this.menu = new Menu(this.board);
    this.win = new Win();

    this.board.onSwap = (move) => {
      this.header.move.innerHTML = move;
    };

    this.board.onFinished = () => {
      if (this.board.win) {
        this.board.stop();
        this.board.board.appendChild(this.win.el);
        this.win.el.classList.add('menu-open');
        this.header.header.classList.add('hide');
        this.win.createWinNewGame(this.board.move, getTimeText(this.board.counter));
        this.btnNewGame(this.win);
      }
    };

    this.board.onTime = (timer) => {
      const [minute, second] = getTime(timer);
      this.header.timer.innerHTML = `${minute} : ${second}`;
    };

    this.btnPause();
    this.btnNewGame(this.menu);
  }

  btnPause() {
    this.header.pause.addEventListener('click', () => {
      if (!this.board.pause) {
        this.board.stop();
        this.header.setTextResume();
        this.board.board.appendChild(this.menu.el);
      } else if (this.board.pause) {
        this.board.start();
        this.header.setTextPause();
        this.menu.el.remove();
      }
    });
  }

  btnNewGame(el) {
    el.newgame.addEventListener('click', () => {
      this.header.setMove();
      this.header.setTimer();
      this.header.setTextPause();
      this.header.header.classList.remove('hide');
      this.board.newGame();
    });
  }
}
